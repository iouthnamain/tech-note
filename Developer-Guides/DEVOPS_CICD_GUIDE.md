# DevOps & CI/CD Guide - Comprehensive

## Table of Contents
1. [Introduction](#introduction)
2. [CI/CD Fundamentals](#cicd-fundamentals)
3. [GitHub Actions](#github-actions)
4. [GitLab CI](#gitlab-ci)
5. [Jenkins](#jenkins)
6. [Docker Containerization](#docker-containerization)
7. [Kubernetes Orchestration](#kubernetes-orchestration)
8. [Infrastructure as Code](#infrastructure-as-code)
9. [Monitoring and Logging](#monitoring-and-logging)
10. [Deployment Strategies](#deployment-strategies)
11. [Environment Management](#environment-management)
12. [Secrets Management in CI/CD](#secrets-management-in-cicd)
13. [Cloud Platforms](#cloud-platforms)
14. [Resources](#resources)
15. [Summary](#summary)

---

## Introduction

This guide covers DevOps practices, CI/CD pipelines, containerization, orchestration, and cloud deployment. Learn to automate development workflows and deploy applications reliably.

### Who This Guide Is For
- DevOps engineers
- Backend developers
- System administrators
- Anyone involved in deployment

---

## CI/CD Fundamentals

### CI/CD Pipeline Flow

```mermaid
flowchart TD
    Start([Code Commit]) --> Trigger[CI/CD Triggered]
    Trigger --> Checkout[Checkout Code]
    Checkout --> Install[Install Dependencies]
    
    Install --> Lint[Lint Code]
    Lint --> Build[Build Application]
    Build --> UnitTest[Unit Tests]
    
    UnitTest --> TestPass{Tests<br/>Pass?}
    TestPass -->|No| Notify[Notify Team]
    TestPass -->|Yes| SecurityScan[Security Scan]
    
    SecurityScan --> QualityCheck{Quality<br/>Gate Pass?}
    QualityCheck -->|No| Notify
    QualityCheck -->|Yes| Package[Package Artifact]
    
    Package --> BuildImage[Build Docker Image]
    BuildImage --> PushRegistry[Push to Registry]
    
    PushRegistry --> DeployStaging[Deploy to Staging]
    DeployStaging --> IntegrationTest[Integration Tests]
    IntegrationTest --> E2ETest[E2E Tests]
    
    E2ETest --> StagingPass{Staging<br/>Tests Pass?}
    StagingPass -->|No| RollbackStaging[Rollback Staging]
    StagingPass -->|Yes| DeployProd[Deploy to Production]
    
    DeployProd --> SmokeTest[Smoke Tests]
    SmokeTest --> ProdPass{Production<br/>Healthy?}
    ProdPass -->|No| RollbackProd[Rollback Production]
    ProdPass -->|Yes| Monitor[Monitor Application]
    
    Notify --> End([Pipeline Failed])
    RollbackStaging --> End
    RollbackProd --> End
    Monitor --> Success([Deployment Successful])
    
    style Start fill:#e1f5ff
    style Success fill:#6bcf7f
    style End fill:#ff6b6b
```

### CI/CD Pipeline Architecture

```mermaid
graph TB
    subgraph Source[Source Control]
        Git[Git Repository]
        Webhook[Webhook]
    end
    
    subgraph CI[CI Pipeline]
        Build[Build Stage]
        Test[Test Stage]
        Security[Security Stage]
        Package[Package Stage]
    end
    
    subgraph Artifacts[Artifacts]
        DockerImage[Docker Image]
        Artifact[Application Artifact]
        SBOM[Software Bill of Materials]
    end
    
    subgraph Registry[Container Registry]
        DockerHub[Docker Hub]
        ECR[ECR/ACR/GCR]
    end
    
    subgraph CD[CD Pipeline]
        DeployStaging[Deploy to Staging]
        DeployProd[Deploy to Production]
        Rollback[Rollback Mechanism]
    end
    
    subgraph Environments[Environments]
        Staging[Staging Environment]
        Production[Production Environment]
    end
    
    subgraph Monitoring[Monitoring]
        Metrics[Metrics Collection]
        Logs[Log Aggregation]
        Alerts[Alerting]
    end
    
    Git --> Webhook
    Webhook --> Build
    Build --> Test
    Test --> Security
    Security --> Package
    
    Package --> DockerImage
    Package --> Artifact
    Security --> SBOM
    
    DockerImage --> DockerHub
    DockerImage --> ECR
    
    DockerHub --> DeployStaging
    ECR --> DeployStaging
    DeployStaging --> Staging
    Staging --> DeployProd
    DeployProd --> Production
    
    DeployProd --> Rollback
    Rollback --> Production
    
    Production --> Metrics
    Production --> Logs
    Metrics --> Alerts
    Logs --> Alerts
    
    style CI fill:#e1f5ff
    style CD fill:#fff4e6
    style Environments fill:#e1f5ff
    style Monitoring fill:#fff4e6
```

### Continuous Integration (CI)
- Automatically build and test code on every commit
- Catch bugs early
- Ensure code quality
- Run automated tests

### Continuous Deployment (CD)
- Automatically deploy to production
- Reduce manual errors
- Faster releases
- Rollback capabilities

### CI/CD Pipeline Stages

1. **Source**: Code repository
2. **Build**: Compile/build application
3. **Test**: Run automated tests
4. **Deploy**: Deploy to environments
5. **Monitor**: Monitor application

---

## GitHub Actions

### Basic Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
```

### Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## GitLab CI

### GitLab CI Configuration

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_IMAGE: myapp:latest

build:
  stage: build
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  only:
    - main
    - develop

test:
  stage: test
  script:
    - npm install
    - npm test
    - npm run lint

deploy:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=$DOCKER_IMAGE
  only:
    - main
  environment:
    name: production
```

---

## Jenkins

### Jenkins Pipeline

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'myapp:latest'
        REGISTRY = 'registry.example.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Push') {
            steps {
                sh 'docker push ${REGISTRY}/${DOCKER_IMAGE}'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

### Jenkins Declarative Pipeline

```groovy
pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
            }
        }
    }
}
```

---

## Docker Containerization

### Docker Container Architecture

```mermaid
graph TB
    subgraph Host[Host Machine]
        DockerEngine[Docker Engine]
        Container1[Container 1<br/>Application A]
        Container2[Container 2<br/>Application B]
        Container3[Container 3<br/>Database]
    end
    
    subgraph Images[Container Images]
        Image1[Image: app-a:latest]
        Image2[Image: app-b:latest]
        Image3[Image: postgres:15]
    end
    
    subgraph Registry[Container Registry]
        DockerHub[Docker Hub]
        PrivateRegistry[Private Registry]
    end
    
    subgraph Network[Docker Network]
        BridgeNetwork[Bridge Network]
        OverlayNetwork[Overlay Network]
    end
    
    subgraph Storage[Docker Storage]
        Volumes[Volumes]
        BindMounts[Bind Mounts]
    end
    
    Image1 --> Container1
    Image2 --> Container2
    Image3 --> Container3
    
    DockerHub --> Image1
    DockerHub --> Image2
    PrivateRegistry --> Image3
    
    Container1 --> BridgeNetwork
    Container2 --> BridgeNetwork
    Container3 --> BridgeNetwork
    
    Container1 --> Volumes
    Container2 --> Volumes
    Container3 --> Volumes
    
    DockerEngine --> Container1
    DockerEngine --> Container2
    DockerEngine --> Container3
    
    style Host fill:#e1f5ff
    style Images fill:#fff4e6
    style Network fill:#e1f5ff
    style Storage fill:#fff4e6
```

### Docker Build Process

```mermaid
sequenceDiagram
    participant Developer
    participant Dockerfile as Dockerfile
    participant DockerEngine as Docker Engine
    participant BuildCache as Build Cache
    participant ImageLayer as Image Layers
    participant Registry as Container Registry
    
    Developer->>Dockerfile: Write Dockerfile
    Developer->>DockerEngine: docker build
    DockerEngine->>Dockerfile: Read Instructions
    
    loop For Each Instruction
        DockerEngine->>BuildCache: Check Cache
        BuildCache-->>DockerEngine: Cache Hit/Miss
        
        alt Cache Miss
            DockerEngine->>DockerEngine: Execute Instruction
            DockerEngine->>ImageLayer: Create Layer
            ImageLayer->>BuildCache: Update Cache
        else Cache Hit
            DockerEngine->>ImageLayer: Use Cached Layer
        end
    end
    
    DockerEngine->>ImageLayer: Combine Layers
    ImageLayer->>DockerEngine: Final Image
    DockerEngine->>Registry: Push Image
    Registry-->>Developer: Image Available
```

### Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## Kubernetes Orchestration

### Kubernetes Cluster Architecture

```mermaid
graph TB
    subgraph ControlPlane[Control Plane]
        APIServer[API Server]
        Scheduler[Scheduler]
        ControllerManager[Controller Manager]
        etcd[etcd<br/>Cluster State]
    end
    
    subgraph WorkerNodes[Worker Nodes]
        subgraph Node1[Node 1]
            Kubelet1[Kubelet]
            KubeProxy1[kube-proxy]
            Pod1[Pod 1]
            Pod2[Pod 2]
        end
        
        subgraph Node2[Node 2]
            Kubelet2[Kubelet]
            KubeProxy2[kube-proxy]
            Pod3[Pod 3]
            Pod4[Pod 4]
        end
        
        subgraph Node3[Node 3]
            Kubelet3[Kubelet]
            KubeProxy3[kube-proxy]
            Pod5[Pod 5]
            Pod6[Pod 6]
        end
    end
    
    subgraph Services[Services]
        Service1[Service: app-service]
        Service2[Service: db-service]
        Ingress[Ingress Controller]
    end
    
    subgraph Storage[Storage]
        PV1[Persistent Volume 1]
        PV2[Persistent Volume 2]
        StorageClass[Storage Class]
    end
    
    APIServer --> Scheduler
    APIServer --> ControllerManager
    APIServer --> etcd
    
    APIServer --> Kubelet1
    APIServer --> Kubelet2
    APIServer --> Kubelet3
    
    Kubelet1 --> Pod1
    Kubelet1 --> Pod2
    Kubelet2 --> Pod3
    Kubelet2 --> Pod4
    Kubelet3 --> Pod5
    Kubelet3 --> Pod6
    
    Service1 --> Pod1
    Service1 --> Pod2
    Service1 --> Pod3
    Service2 --> Pod4
    
    Ingress --> Service1
    Ingress --> Service2
    
    Pod4 --> PV1
    Pod5 --> PV2
    StorageClass --> PV1
    StorageClass --> PV2
    
    style ControlPlane fill:#e1f5ff
    style WorkerNodes fill:#fff4e6
    style Services fill:#e1f5ff
    style Storage fill:#fff4e6
```

### Kubernetes Deployment Flow

```mermaid
sequenceDiagram
    participant Developer
    participant kubectl as kubectl
    participant APIServer as API Server
    participant Scheduler as Scheduler
    participant Kubelet as Kubelet
    participant Container as Container Runtime
    
    Developer->>kubectl: kubectl apply -f deployment.yaml
    kubectl->>APIServer: Create Deployment
    APIServer->>APIServer: Validate & Store
    
    APIServer->>Scheduler: Schedule Pods
    Scheduler->>Scheduler: Select Node
    Scheduler->>APIServer: Bind Pod to Node
    
    APIServer->>Kubelet: Create Pod
    Kubelet->>Container: Pull Image
    Container-->>Kubelet: Image Ready
    Kubelet->>Container: Start Container
    Container-->>Kubelet: Container Running
    
    Kubelet->>APIServer: Update Pod Status
    APIServer->>kubectl: Pod Status
    kubectl-->>Developer: Deployment Ready
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## Infrastructure as Code

### Infrastructure as Code Flow

```mermaid
flowchart TD
    Start([Infrastructure Change]) --> WriteCode[Write IaC Code<br/>Terraform/CloudFormation]
    WriteCode --> Validate[Validate Code]
    
    Validate --> Plan[Generate Plan]
    Plan --> Review{Review<br/>Plan?}
    
    Review -->|Changes Needed| WriteCode
    Review -->|Approve| Apply[Apply Changes]
    
    Apply --> Provision[Provision Resources]
    Provision --> Configure[Configure Resources]
    Configure --> Verify[Verify Infrastructure]
    
    Verify --> StateUpdate[Update State]
    StateUpdate --> Document[Document Changes]
    Document --> End([Infrastructure Updated])
    
    style Start fill:#e1f5ff
    style End fill:#fff4e6
```

### Infrastructure as Code Architecture

```mermaid
graph TB
    subgraph Source[Source Code]
        Terraform[Terraform Files]
        CloudFormation[CloudFormation Templates]
        Ansible[Ansible Playbooks]
    end
    
    subgraph VersionControl[Version Control]
        Git[Git Repository]
        CI[CI Pipeline]
    end
    
    subgraph Provisioning[Provisioning]
        TerraformCLI[Terraform CLI]
        CloudProvider[Cloud Provider APIs]
    end
    
    subgraph Infrastructure[Infrastructure]
        Compute[Compute Resources]
        Network[Network Resources]
        Storage[Storage Resources]
        Security[Security Resources]
    end
    
    subgraph State[State Management]
        StateFile[State File]
        StateBackend[State Backend<br/>S3/Terraform Cloud]
    end
    
    Terraform --> Git
    CloudFormation --> Git
    Ansible --> Git
    
    Git --> CI
    CI --> TerraformCLI
    
    TerraformCLI --> CloudProvider
    CloudProvider --> Compute
    CloudProvider --> Network
    CloudProvider --> Storage
    CloudProvider --> Security
    
    TerraformCLI --> StateFile
    StateFile --> StateBackend
    
    style Source fill:#e1f5ff
    style Provisioning fill:#fff4e6
    style Infrastructure fill:#e1f5ff
    style State fill:#fff4e6
```

### Terraform

```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "MyApp"
  }
}

resource "aws_s3_bucket" "app_bucket" {
  bucket = "myapp-bucket"
  
  versioning {
    enabled = true
  }
}
```

---

## Monitoring and Logging

### Monitoring and Logging Architecture

```mermaid
graph TB
    subgraph Applications[Applications]
        App1[Application 1]
        App2[Application 2]
        App3[Application 3]
    end
    
    subgraph MetricsCollection[Metrics Collection]
        Prometheus[Prometheus<br/>Metrics Server]
        Exporters[Exporters<br/>Node/App Exporters]
    end
    
    subgraph LogCollection[Log Collection]
        Fluentd[Fluentd<br/>Log Aggregator]
        Filebeat[Filebeat<br/>Log Shipper]
    end
    
    subgraph Storage[Storage]
        TSDB[(Time Series DB<br/>Prometheus)]
        Elasticsearch[(Elasticsearch<br/>Log Storage)]
    end
    
    subgraph Visualization[Visualization]
        Grafana[Grafana<br/>Dashboards]
        Kibana[Kibana<br/>Log Analysis]
    end
    
    subgraph Alerting[Alerting]
        AlertManager[Alert Manager]
        PagerDuty[PagerDuty]
        Slack[Slack]
    end
    
    App1 --> Exporters
    App2 --> Exporters
    App3 --> Exporters
    Exporters --> Prometheus
    
    App1 --> Fluentd
    App2 --> Filebeat
    App3 --> Fluentd
    Filebeat --> Fluentd
    Fluentd --> Elasticsearch
    
    Prometheus --> TSDB
    TSDB --> Grafana
    Elasticsearch --> Kibana
    
    Prometheus --> AlertManager
    AlertManager --> PagerDuty
    AlertManager --> Slack
    
    Grafana --> AlertManager
    
    style Applications fill:#e1f5ff
    style MetricsCollection fill:#fff4e6
    style LogCollection fill:#e1f5ff
    style Visualization fill:#fff4e6
```

### Monitoring Data Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Exporter as Metrics Exporter
    participant Prometheus as Prometheus
    participant Grafana as Grafana
    participant AlertManager as Alert Manager
    
    App->>Exporter: Expose Metrics
    Exporter->>Prometheus: Scrape Metrics
    Prometheus->>Prometheus: Store in TSDB
    
    Grafana->>Prometheus: Query Metrics
    Prometheus-->>Grafana: Return Data
    Grafana->>Grafana: Render Dashboard
    
    Prometheus->>AlertManager: Evaluate Rules
    alt Alert Condition Met
        AlertManager->>AlertManager: Trigger Alert
        AlertManager->>Team: Send Notification
    end
```

### Prometheus

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'myapp'
    static_configs:
      - targets: ['localhost:3000']
```

### Grafana Dashboard

```json
{
  "dashboard": {
    "title": "MyApp Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      }
    ]
  }
}
```

---

## Deployment Strategies

### Deployment Strategies Comparison

```mermaid
graph TB
    subgraph Strategies[Deployment Strategies]
        Rolling[Rolling Deployment<br/>Gradual Replacement]
        BlueGreen[Blue-Green Deployment<br/>Two Environments]
        Canary[Canary Deployment<br/>Gradual Rollout]
        Recreate[Recreate Deployment<br/>Stop & Replace]
    end
    
    subgraph Characteristics[Characteristics]
        Downtime[Downtime: None/Some]
        Risk[Risk: Low/Medium/High]
        Rollback[Rollback: Easy/Medium/Hard]
        Cost[Cost: Low/Medium/High]
    end
    
    Rolling --> Downtime
    BlueGreen --> Downtime
    Canary --> Downtime
    Recreate --> Downtime
    
    Rolling --> Risk
    BlueGreen --> Risk
    Canary --> Risk
    Recreate --> Risk
    
    Rolling --> Rollback
    BlueGreen --> Rollback
    Canary --> Rollback
    Recreate --> Rollback
    
    Rolling --> Cost
    BlueGreen --> Cost
    Canary --> Cost
    Recreate --> Cost
    
    style Strategies fill:#e1f5ff
    style Characteristics fill:#fff4e6
```

### Blue-Green Deployment Flow

```mermaid
sequenceDiagram
    participant Developer
    participant LoadBalancer as Load Balancer
    participant BlueEnv as Blue Environment<br/>Current Version
    participant GreenEnv as Green Environment<br/>New Version
    participant Monitor as Monitoring
    
    Note over LoadBalancer,GreenEnv: Initial State
    LoadBalancer->>BlueEnv: Route Traffic (100%)
    BlueEnv-->>LoadBalancer: Serve Requests
    
    Developer->>GreenEnv: Deploy New Version
    GreenEnv->>GreenEnv: Start Services
    GreenEnv->>Monitor: Health Checks
    Monitor-->>GreenEnv: Healthy
    
    Developer->>LoadBalancer: Switch Traffic
    LoadBalancer->>GreenEnv: Route Traffic (100%)
    GreenEnv-->>LoadBalancer: Serve Requests
    
    Note over LoadBalancer,GreenEnv: Verification Period
    GreenEnv->>Monitor: Monitor Metrics
    Monitor-->>Developer: Metrics OK
    
    alt Issues Detected
        Developer->>LoadBalancer: Rollback
        LoadBalancer->>BlueEnv: Route Traffic (100%)
    else No Issues
        Developer->>BlueEnv: Decommission
        BlueEnv->>BlueEnv: Shutdown
    end
```

### Canary Deployment Flow

```mermaid
flowchart TD
    Start([New Version Ready]) --> DeployCanary[Deploy Canary<br/>5% Traffic]
    DeployCanary --> Monitor1[Monitor Metrics]
    
    Monitor1 --> Check1{Metrics<br/>OK?}
    Check1 -->|No| Rollback[Rollback Canary]
    Check1 -->|Yes| Increase1[Increase to 25%]
    
    Increase1 --> Monitor2[Monitor Metrics]
    Monitor2 --> Check2{Metrics<br/>OK?}
    Check2 -->|No| Rollback
    Check2 -->|Yes| Increase2[Increase to 50%]
    
    Increase2 --> Monitor3[Monitor Metrics]
    Monitor3 --> Check3{Metrics<br/>OK?}
    Check3 -->|No| Rollback
    Check3 -->|Yes| Increase3[Increase to 100%]
    
    Increase3 --> Monitor4[Monitor Metrics]
    Monitor4 --> Check4{Metrics<br/>OK?}
    Check4 -->|No| Rollback
    Check4 -->|Yes| Complete([Deployment Complete])
    
    Rollback --> End([Deployment Failed])
    
    style Start fill:#e1f5ff
    style Complete fill:#6bcf7f
    style End fill:#ff6b6b
```

### Deployment Strategies Comparison

```mermaid
graph TB
    subgraph BlueGreen["Blue-Green Deployment"]
        BG1[Blue Environment<br/>Current Version] --> Switch[Switch Traffic]
        BG2[Green Environment<br/>New Version] --> Switch
        Switch --> Users[Users]
    end
    
    subgraph Canary["Canary Deployment"]
        C1[Current Version<br/>90% Traffic] --> Users
        C2[New Version<br/>10% Traffic] --> Users
        C2 --> Monitor[Monitor Metrics]
        Monitor -->|Success| FullRollout[Full Rollout]
        Monitor -->|Failure| Rollback[Rollback]
    end
    
    subgraph Rolling["Rolling Deployment"]
        R1[Instance 1<br/>New Version] --> Users
        R2[Instance 2<br/>Updating] --> Users
        R3[Instance 3<br/>Old Version] --> Users
    end
```

### Blue-Green Deployment

```yaml
# Deploy new version (green)
# Switch traffic from blue to green
# Keep blue for rollback
```

### Canary Deployment

```yaml
# Deploy new version to small percentage
# Monitor metrics
# Gradually increase traffic
# Full rollout or rollback
```

### Rolling Deployment

```yaml
# Gradually replace old instances
# Zero downtime
# Automatic rollback on failure
```

---

## Common Pitfalls

### 1. Not Testing in CI/CD

```yaml
# BAD: No tests in pipeline
- name: Build
  run: npm run build
- name: Deploy
  run: npm run deploy

# GOOD: Tests in pipeline
- name: Test
  run: npm test
- name: Build
  run: npm run build
- name: Deploy
  run: npm run deploy
```

### 2. Hardcoding Secrets

```yaml
# BAD: Hardcoded secrets
env:
  API_KEY: "sk_live_1234567890"

# GOOD: Use secrets
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 3. No Rollback Strategy

```yaml
# BAD: No rollback plan
- name: Deploy
  run: kubectl apply -f deployment.yaml

# GOOD: With rollback
- name: Deploy
  run: kubectl apply -f deployment.yaml
- name: Health Check
  run: ./health-check.sh
- name: Rollback on Failure
  if: failure()
  run: kubectl rollout undo deployment/app
```

---

## Best Practices

### DevOps Best Practices

1. **Infrastructure as Code**
   - Version control infrastructure
   - Use Terraform or CloudFormation
   - Review infrastructure changes

2. **Automate Everything**
   - CI/CD pipelines
   - Testing
   - Deployment
   - Monitoring

3. **Security First**
   - Scan for vulnerabilities
   - Use secrets management
   - Implement least privilege

4. **Monitor and Alert**
   - Set up monitoring
   - Configure alerts
   - Track metrics

---

## Real-World Examples

### Example 1: Complete CI/CD Pipeline

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
      - name: Deploy to production
        run: |
          # Deployment commands
```

### Example 2: Docker Multi-Stage Build

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Environment Management

### Environment Variables

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: myapp:latest
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - API_KEY=${API_KEY}
    env_file:
      - .env.production
```

### Configuration Management

```typescript
// config.ts
interface Config {
    database: {
        host: string;
        port: number;
        name: string;
    };
    api: {
        baseUrl: string;
        timeout: number;
    };
}

function loadConfig(): Config {
    return {
        database: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            name: process.env.DB_NAME || 'mydb'
        },
        api: {
            baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
            timeout: parseInt(process.env.API_TIMEOUT || '5000')
        }
    };
}
```

---

## Secrets Management in CI/CD

### GitHub Secrets

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        env:
          API_KEY: ${{ secrets.API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          echo "Deploying with secrets..."
```

### HashiCorp Vault

```typescript
import { Vault } from 'node-vault';

const vault = Vault({
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN
});

async function getSecret(path: string): Promise<any> {
    const response = await vault.read(path);
    return response.data;
}

// Usage
const dbPassword = await getSecret('secret/data/database');
```

### AWS Secrets Manager

```typescript
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({ region: 'us-east-1' });

async function getSecret(secretName: string): Promise<string> {
    const response = await client.getSecretValue({ SecretId: secretName });
    return JSON.parse(response.SecretString || '{}');
}
```

---

## Cloud Platforms

### AWS Deployment

```yaml
# AWS CloudFormation
Resources:
  AppFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: myapp
      Runtime: nodejs18.x
      Handler: index.handler
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            return { statusCode: 200, body: 'Hello' };
          };
```

### Google Cloud Platform (GCP)

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/myapp', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/myapp']
  - name: 'gcr.io/cloud-builders/kubectl'
    args: ['set', 'image', 'deployment/myapp', 'myapp=gcr.io/$PROJECT_ID/myapp']
```

### Azure

```yaml
# azure-pipelines.yml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: Docker@2
    inputs:
      containerRegistry: 'AzureContainerRegistry'
      repository: 'myapp'
      command: 'buildAndPush'
      Dockerfile: '**/Dockerfile'
```

---

## Serverless Deployment

### AWS Lambda

```typescript
// lambda.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda',
            path: event.path
        })
    };
};
```

### Serverless Framework

```yaml
# serverless.yml
service: myapp

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
```

---

## Disaster Recovery

### Backup Strategy

```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="mydb"

# Database backup
pg_dump $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Application backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /app

# Upload to S3
aws s3 cp $BACKUP_DIR/db_$DATE.sql s3://backups/database/
aws s3 cp $BACKUP_DIR/app_$DATE.tar.gz s3://backups/application/
```

### Recovery Procedures

```bash
# Database recovery
psql mydb < /backups/db_20240101_120000.sql

# Application recovery
tar -xzf /backups/app_20240101_120000.tar.gz -C /app

# Rollback deployment
kubectl rollout undo deployment/myapp
```

### High Availability Setup

```yaml
# High availability configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: app
        image: myapp:latest
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
```

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

---

## Summary

Key DevOps and CI/CD practices:

1. **CI/CD**: Automate build, test, and deployment
2. **Docker**: Containerize applications
3. **Kubernetes**: Orchestrate containers
4. **Infrastructure as Code**: Manage infrastructure
5. **Monitoring**: Monitor applications
6. **Deployment Strategies**: Blue-green, canary, rolling
7. **Secrets Management**: Secure secret handling
8. **Cloud Platforms**: AWS, GCP, Azure

Master these practices to build reliable deployment pipelines.

