# Getting Started Guide - Employee Leave System Personal Practice Project

**Complete guide to start your 12-week solo ABAP development journey**

---

## Table of Contents

1. [Current Phase Overview](#current-phase-overview)
2. [Pre-Coding Preparation (Weeks 1-2)](#pre-coding-preparation-weeks-1-2)
3. [SAP Development Environment Setup](#sap-development-environment-setup)
4. [Installing SAP NetWeaver AS ABAP Developer Edition on Ubuntu Server](#installing-sap-netweaver-as-abap-developer-edition-on-ubuntu-server)
5. [Eclipse ADT Setup - Detailed Guide](#eclipse-adt-setup---detailed-guide)
6. [First Coding Steps (Week 3)](#first-coding-steps-week-3)
7. [Key Transactions Reference](#key-transactions-reference)
8. [Recommended Learning Path](#recommended-learning-path)
9. [Quick Start Checklists](#quick-start-checklists)

---

## Current Phase Overview

### ⚠️ Important: You're in Phase 1 (Weeks 1-2)

**Current Status**: Requirements & Design Phase  
**Coding Starts**: Week 3 (Foundation & Data Model)

**What This Means**:
- Week 1-2: Documentation and design work only (no coding required)
- Week 3: First coding tasks begin (database table creation)
- Focus on understanding requirements and designing the system first

---

## Pre-Coding Preparation (Weeks 1-2)

### Step 1: Review Project Requirements

**Action Items**:
1. Read the project specification: `Capstone/Abap-4.md`
2. Understand the 5 key features:
   - Create Leave Request
   - Multi-level Approval Workflow
   - Leave History Lookup
   - Statistics & Reporting
   - Email Notifications & Print Forms

**Time**: 1-2 hours

---

### Step 2: Complete Week 1 Tasks (Documentation)

**Follow**: `Phase1_Requirements_Design.md` or `Sprints/Sprint01_Requirements_Gathering.md`

**Tasks**:
- [ ] Analyze business requirements
- [ ] Document functional requirements
- [ ] Define data model requirements
- [ ] Identify HR integration points
- [ ] Define workflow requirements
- [ ] Design UI/UX requirements
- [ ] Create technical specification

**Deliverables**: Requirements documents (no coding yet)

**Time**: 35-40 hours for the week

---

### Step 3: Complete Week 2 Tasks (Design)

**Follow**: `Phase1_Requirements_Design.md` → Week 2

**Tasks**:
- [ ] Finalize data dictionary design
- [ ] Design ABAP class structure
- [ ] Design workflow template
- [ ] Design screen layouts
- [ ] Design SmartForm layout
- [ ] Create test plan

**Deliverables**: Complete technical design (no coding yet)

**Time**: 35-40 hours for the week

---

## SAP Development Environment Setup

### ⚠️ Important Update (2024)

**SAP NetWeaver AS ABAP Developer Edition has been discontinued** as of October 2022. SAP now provides:
- **ABAP Platform 1909 Developer Edition** - Available as Docker image (Recommended)
- **ABAP Platform Trial** - Cloud-based option

**For Ubuntu Server**: Docker installation is the **recommended and easiest method**.

---

### Option 1: Docker Installation (Recommended for Ubuntu)

**What You Need**:
- Ubuntu Server with Docker installed
- 16 GB RAM minimum
- 150 GB free disk space
- Quad-core CPU

**Pros**:
- ✅ Easiest installation on Ubuntu
- ✅ No compatibility issues
- ✅ Isolated environment
- ✅ Easy to start/stop/restart
- ✅ Official SAP Docker image
- ✅ Works on any Linux distribution

**Cons**:
- Requires Docker knowledge
- Uses ABAP Platform 1909 (newer version)

**→ See Docker installation guide below**

---

### Option 2: SAP GUI (Traditional - If You Have Existing System)

**What You Need**:
- SAP GUI installed on your computer
- Access to SAP development system (ECC or S/4HANA)
- Development user credentials
- Required authorizations

**Installation**:
1. Download SAP GUI from SAP Support Portal or your organization
2. Install SAP GUI (follow installation wizard)
3. Configure connection to your SAP system
4. Log in with your development user

**Pros**: 
- Traditional, widely used
- Direct access to all transactions
- No additional setup needed

**Cons**:
- Older interface
- Less modern development experience
- Requires existing SAP system access

---

### Option 3: Eclipse with ADT (Recommended for Development)

**What You Need**:
- Eclipse IDE (latest version)
- ABAP Development Tools (ADT) plugin
- Access to SAP development system (from Docker or existing system)
- Development user credentials

**Pros**:
- Modern IDE experience
- Better code navigation
- Integrated debugging
- Version control support
- Better for large projects

**Cons**:
- Requires setup
- Some transactions still need SAP GUI

**→ See detailed setup guide below**

---

## Installing SAP ABAP Platform Developer Edition on Ubuntu Server (Docker Method)

### ⚠️ Important Update

**SAP NetWeaver AS ABAP Developer Edition has been discontinued** (as of October 2022). SAP now provides:
- **ABAP Platform 1909 Developer Edition** - Available as official Docker image
- This is the **recommended and easiest method** for Ubuntu Server installation

**Why Docker is Recommended**:
- ✅ Official SAP support via Docker
- ✅ No Ubuntu compatibility issues
- ✅ Easier installation and management
- ✅ Isolated environment
- ✅ Works on any Linux distribution
- ✅ Easy to start/stop/restart
- ✅ No complex hostname/hosts file configuration needed
- ✅ Port mapping handled automatically

**This guide focuses on Docker installation**, which is the easiest and most reliable method for Ubuntu.

---

### Quick Start (Docker Method)

**If you just want to get started quickly**:

```bash
# 1. Install Docker
sudo apt update && sudo apt install -y docker.io
sudo systemctl start docker && sudo systemctl enable docker

# 2. Run SAP ABAP Platform container
docker run --stop-timeout 3600 --ulimit nofile=1048576:1048576 \
  --detach --name a4h --hostname vhcala4hci \
  -p 3200:3200 -p 3300:3300 -p 8443:8443 \
  -p 30213:30213 -p 50000:50000 -p 50001:50001 \
  store/saplabs/abaptrial:1909

# 3. Wait for initialization (15-30 minutes first time)
docker logs -f a4h

# 4. Access via web browser
# https://your-server-ip:8443/sap/bc/gui/sap/its/webgui
# User: DEVELOPER, Password: Down1oad
```

**See detailed steps below for complete instructions.**

---

### Prerequisites & System Requirements

#### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 16 GB | 32 GB or more |
| **Disk Space** | 150 GB free | 200 GB free |
| **CPU** | 64-bit processor, 4 cores (quad-core) | 64-bit processor, 8+ cores |
| **Network** | Stable internet for download | Stable internet for download |

**Note**: The Docker container will be resource-intensive. More RAM and disk space will result in better performance.

#### Software Requirements

- **Operating System**: Ubuntu 20.04 LTS, Ubuntu 22.04 LTS, or Ubuntu 24.04 LTS (64-bit)
- **Docker**: Docker Engine 20.10 or later
- **Internet Connection**: Stable connection for downloading Docker image (~15-20 GB)

#### Install Docker on Ubuntu

Before starting, install Docker:

```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Verify Docker installation
docker --version

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER

# Log out and log back in for group changes to take effect
# Or run: newgrp docker
```

**Verify Docker is Running**:
```bash
sudo systemctl status docker
# Should show "active (running)"
```

---

### Step 1: Pull SAP ABAP Platform 1909 Docker Image

#### About the Docker Image

- **Image Name**: `store/saplabs/abaptrial:1909`
- **Official Source**: SAP Store (Docker Hub)
- **Size**: Approximately 15-20 GB (will be downloaded automatically)
- **Version**: ABAP Platform 1909 Developer Edition
- **License**: Free for development and learning purposes

#### Pull the Docker Image

**Method 1: Pull and Run in One Command (Recommended)**

```bash
# Pull and run the Docker container
docker run \
  --stop-timeout 3600 \
  --ulimit nofile=1048576:1048576 \
  --detach \
  --name a4h \
  --hostname vhcala4hci \
  --publish 3200:3200 \
  --publish 3300:3300 \
  --publish 8443:8443 \
  --publish 30213:30213 \
  --publish 50000:50000 \
  --publish 50001:50001 \
  store/saplabs/abaptrial:1909
```

**What This Command Does**:
- `--stop-timeout 3600`: Allows 1 hour for graceful shutdown
- `--ulimit nofile=1048576:1048576`: Sets file descriptor limit
- `--detach`: Runs container in background
- `--name a4h`: Names the container "a4h"
- `--hostname vhcala4hci`: Sets hostname inside container
- `--publish`: Maps container ports to host ports
- `store/saplabs/abaptrial:1909`: Official SAP Docker image

**Method 2: Pull First, Then Run**

```bash
# Pull the image first (optional, run command does this automatically)
docker pull store/saplabs/abaptrial:1909

# Then run the container
docker run \
  --stop-timeout 3600 \
  --ulimit nofile=1048576:1048576 \
  --detach \
  --name a4h \
  --hostname vhcala4hci \
  -p 3200:3200 -p 3300:3300 -p 8443:8443 \
  -p 30213:30213 -p 50000:50000 -p 50001:50001 \
  store/saplabs/abaptrial:1909
```

**Download Time**: 30 minutes to 2 hours depending on internet speed

**Monitor Download Progress**:
```bash
# In another terminal, watch Docker pull progress
docker images
# Or
watch docker ps -a
```

---

### Step 2: Accept License Agreement

#### First Run - License Acceptance

When you first run the Docker container, you'll be prompted to accept SAP's Terms and Conditions:

1. **Check Container Logs**
   ```bash
   # View container logs
   docker logs a4h
   
   # Follow logs in real-time
   docker logs -f a4h
   ```

2. **Accept License**
   - The container will display license terms
   - You need to accept them to proceed
   - Look for prompts in the logs
   - Follow on-screen instructions

3. **Wait for Initialization**
   - First startup takes 15-30 minutes
   - Container needs to initialize the SAP system
   - Monitor logs to see progress
   - Wait for "System is ready" message

**Expected Log Output**:
```
Accepting SAP Terms and Conditions...
Initializing ABAP Platform...
Starting services...
System ready!
```

---

### Step 3: Verify Container is Running

#### Check Container Status

```bash
# Check if container is running
docker ps

# Should show container "a4h" with status "Up"
# Example output:
# CONTAINER ID   IMAGE                          STATUS
# abc123def456   store/saplabs/abaptrial:1909  Up 5 minutes
```

#### Check Container Logs

```bash
# View recent logs
docker logs a4h --tail 50

# Follow logs in real-time
docker logs -f a4h

# Check for errors
docker logs a4h | grep -i error
```

#### Verify Ports are Exposed

```bash
# Check if ports are listening
sudo netstat -tulpn | grep -E '3200|3300|8443|30213|50000|50001'

# Or using ss command
sudo ss -tulpn | grep -E '3200|3300|8443|30213|50000|50001'
```

**Expected Ports**:
- `3200`: SAP GUI connection
- `3300`: SAP GUI connection (alternative)
- `8443`: HTTPS web access
- `30213`: SAP RFC connection
- `50000`: SAP HTTP connection
- `50001`: SAP HTTPS connection

---

### Step 4: Wait for System Initialization

#### Initial Startup Process

The Docker container needs time to initialize the SAP system on first run:

1. **First Startup Time**: 15-30 minutes (one-time)
2. **Subsequent Starts**: 5-10 minutes

#### Monitor Initialization

```bash
# Follow logs to see initialization progress
docker logs -f a4h

# Look for these messages:
# - "Starting ABAP Platform..."
# - "Initializing database..."
# - "Starting application server..."
# - "System ready!"
```

#### Check System Readiness

```bash
# Check if system is ready (wait for this command to succeed)
docker exec a4h /usr/sap/A4H/SYS/exe/uc/linuxx86_64/sapcontrol -nr 00 -function GetProcessList

# Or check via web interface
curl -k https://localhost:8443/sap/bc/gui/sap/its/webgui
```

**When System is Ready**:
- Logs show "System ready" or "Installation complete"
- Ports are listening
- Web interface is accessible
- No errors in logs

---

### Step 5: Manage Docker Container

#### Container Management Commands

**Start Container**:
```bash
# Start the container
docker start a4h

# Check status
docker ps
```

**Stop Container**:
```bash
# Stop the container (graceful shutdown, up to 1 hour timeout)
docker stop a4h

# Force stop (immediate)
docker kill a4h
```

**Restart Container**:
```bash
# Restart the container
docker restart a4h
```

**View Container Logs**:
```bash
# View all logs
docker logs a4h

# View last 100 lines
docker logs a4h --tail 100

# Follow logs in real-time
docker logs -f a4h
```

**Execute Commands in Container**:
```bash
# Execute command inside container
docker exec -it a4h bash

# Check SAP processes
docker exec a4h /usr/sap/A4H/SYS/exe/uc/linuxx86_64/sapcontrol -nr 00 -function GetProcessList
```

**Remove Container** (if needed):
```bash
# Stop and remove container
docker stop a4h
docker rm a4h

# Remove image (if needed)
docker rmi store/saplabs/abaptrial:1909
```

#### Container Auto-Start on Boot

To start container automatically when server boots:

```bash
# Create systemd service (optional)
sudo nano /etc/systemd/system/sap-abap.service
```

Add this content:
```ini
[Unit]
Description=SAP ABAP Platform 1909 Container
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/docker start a4h
ExecStop=/usr/bin/docker stop a4h

[Install]
WantedBy=multi-user.target
```

Enable the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable sap-abap.service
```

---

### Step 6: Default Credentials & Access

#### Default System Information

| Parameter | Value |
|-----------|-------|
| **System ID (SID)** | `A4H` |
| **Instance Number** | `00` |
| **Client** | `001` |
| **Hostname** | `vhcala4hci` (inside container) |
| **Application Server** | Your Ubuntu server IP or `localhost` |
| **Container Name** | `a4h` |

#### Default User Credentials

**Developer User**:
- **Username**: `DEVELOPER`
- **Password**: `Down1oad` (case-sensitive)
- **Note**: Change this password after first login!

**Alternative Users** (if available):
- **DDIC**: `19920706` (default password, change immediately)
- **SAP***: `06071992` (default password, change immediately)

#### Access Methods

**1. SAP GUI** (if installed on another machine):
- **Application Server**: Your Ubuntu server IP address (e.g., `192.168.1.100`)
- **System Number**: `00`
- **Client**: `001`
- **User**: `DEVELOPER`
- **Password**: `Down1oad`

**2. Web Browser**:
- **URL**: `https://your-server-ip:8443/sap/bc/gui/sap/its/webgui`
- Or: `https://localhost:8443/sap/bc/gui/sap/its/webgui` (if accessing from server)
- **Note**: Use HTTPS (port 8443), not HTTP
- **Certificate Warning**: Accept the self-signed certificate
- Use same credentials: `DEVELOPER` / `Down1oad`

**3. Eclipse ADT**:
- See connection setup below

**4. Direct Container Access**:
```bash
# Access container shell
docker exec -it a4h bash

# From inside container, you can run SAP commands
```

---

### Step 7: Connect Eclipse ADT to Your SAP System

#### Connection Details for Eclipse ADT

When creating ABAP Project in Eclipse:

1. **Open Eclipse ADT**
   - Launch Eclipse
   - Switch to ABAP perspective

2. **Create New ABAP Project**
   - `File` → `New` → `ABAP Project`

3. **Enter Connection Details**:
   - **Connection Type**: `Application Server`
   - **Application Server**: Your Ubuntu server IP address (e.g., `192.168.1.100`)
     - Or `localhost` if Eclipse is on the same server
   - **Instance Number**: `00`
   - **System ID**: `A4H`
   - **Client**: `001`
   - **User**: `DEVELOPER`
   - **Password**: `Down1oad`
   - **Language**: `EN`

4. **Test Connection**
   - Click `Next`
   - Eclipse will test the connection
   - Wait for connection test (may take 1-2 minutes)
   - **Note**: Ensure Docker container is running and ports are accessible

5. **Complete Setup**
   - Select or create package
   - Click `Finish`

#### Firewall Configuration

If connecting from another machine, ensure firewall allows connections:

```bash
# Allow SAP ports through firewall (Ubuntu UFW)
sudo ufw allow 3200/tcp
sudo ufw allow 3300/tcp
sudo ufw allow 8443/tcp
sudo ufw allow 30213/tcp
sudo ufw allow 50000/tcp
sudo ufw allow 50001/tcp

# Check firewall status
sudo ufw status
```

---

### Troubleshooting Docker-Specific Issues

#### Issue 1: Docker Container Won't Start

**Symptoms**: Container exits immediately or fails to start

**Solutions**:
```bash
# Check container logs
docker logs a4h

# Check Docker daemon is running
sudo systemctl status docker

# Restart Docker service
sudo systemctl restart docker

# Try starting container again
docker start a4h
```

#### Issue 2: Port Already in Use

**Symptoms**: Error "port is already allocated" when starting container

**Solutions**:
```bash
# Check what's using the ports
sudo netstat -tulpn | grep -E '3200|3300|8443|30213|50000|50001'

# Stop conflicting service
# Or remove old container and create new one with different ports
docker stop a4h
docker rm a4h

# Recreate with different port mappings (if needed)
docker run --detach --name a4h --hostname vhcala4hci \
  -p 3201:3200 -p 3301:3300 -p 8444:8443 \
  -p 30214:30213 -p 50002:50000 -p 50003:50001 \
  store/saplabs/abaptrial:1909
```

#### Issue 3: Insufficient Memory

**Symptoms**: Container crashes or very slow performance

**Solutions**:
```bash
# Check system memory
free -h

# Check Docker memory usage
docker stats a4h

# Add swap space (if needed)
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Limit container memory (if needed)
docker update --memory=16g --memory-swap=24g a4h
```

#### Issue 4: Cannot Connect from Eclipse ADT

**Symptoms**: Connection timeout or connection refused

**Solutions**:
```bash
# Verify container is running
docker ps

# Check ports are exposed
docker port a4h

# Test connection from server
curl -k https://localhost:8443

# Check firewall
sudo ufw status
sudo ufw allow 8443/tcp

# Verify container hostname
docker exec a4h hostname
```

#### Issue 5: Container Takes Too Long to Start

**Symptoms**: Container seems stuck during initialization

**Solutions**:
```bash
# Check logs for progress
docker logs -f a4h

# First startup takes 15-30 minutes - this is normal
# Look for "System ready" message in logs

# Check container resource usage
docker stats a4h

# If stuck, check disk space
df -h
```

#### Issue 6: Docker Image Pull Fails

**Symptoms**: Cannot pull Docker image

**Solutions**:
```bash
# Check internet connection
ping -c 3 hub.docker.com

# Try pulling with verbose output
docker pull store/saplabs/abaptrial:1909

# Check Docker daemon logs
sudo journalctl -u docker.service

# Restart Docker service
sudo systemctl restart docker
```

#### Issue 7: License Agreement Not Accepted

**Symptoms**: Container keeps asking for license acceptance

**Solutions**:
```bash
# Check logs for license prompt
docker logs a4h | grep -i license

# Remove container and recreate (will prompt again)
docker stop a4h
docker rm a4h
docker run ... (same command as before)

# Follow prompts in logs to accept license
docker logs -f a4h
```

---

### Finding Your Server IP Address

For connecting from Eclipse ADT or SAP GUI, you need your Ubuntu server's IP address:

```bash
# Method 1: Using ip command
ip addr show | grep "inet " | grep -v 127.0.0.1

# Method 2: Using hostname command
hostname -I

# Method 3: Using ifconfig (if installed)
ifconfig | grep "inet " | grep -v 127.0.0.1

# Method 4: Check specific interface
ip addr show eth0
# Or
ip addr show enp0s3
```

**Example Output**: `192.168.1.100` (use this IP for connections)

**For Local Access**: Use `localhost` or `127.0.0.1` if accessing from the same server

---

### Alternative Installation Methods

#### Option 1: Docker (Current Method - Recommended) ✅

✅ **This is the method described above** - Docker installation on Ubuntu

**Advantages**:
- Easiest installation
- No compatibility issues
- Official SAP support
- Easy to manage

#### Option 2: Virtual Machine with SLES

If Docker doesn't work for you:

1. **Download SLES VM Image**
   - Use SAP Cloud Appliance Library (CAL)
   - Or download pre-configured SLES VM

2. **Run in VirtualBox/VMware**
   - Import VM image
   - Start and configure
   - More reliable than direct Ubuntu installation

#### Option 3: SAP Cloud Appliance Library (CAL)

1. **Access CAL**
   - Go to: https://cal.sap.com/
   - Requires SAP account

2. **Deploy Pre-configured System**
   - Select ABAP Platform 1909 Developer Edition
   - Deploy to cloud or download VM
   - Easier setup, but requires cloud account

#### Option 4: Direct Installation on SLES (Advanced - Not Recommended for Ubuntu)

**Note**: Direct installation on Ubuntu is not officially supported and is complex. Docker is strongly recommended instead.

If you have access to SLES:

1. **Install SLES on server or VM**
2. **Follow SAP installation guide for SLES**
3. **More complex but officially supported**

---

### Post-Installation Best Practices

#### Security Hardening

**Immediately After Installation**:

1. **Change Default Passwords**
   ```bash
   # Log into SAP system
   # Transaction: SU01
   # Change passwords for:
   # - DEVELOPER
   # - DDIC
   # - SAP*
   ```

2. **Disable Unused Services**
   - Review and disable unnecessary services
   - Close unused ports

3. **Update System**
   ```bash
   # Keep Ubuntu updated
   sudo apt update && sudo apt upgrade
   ```

#### Performance Optimization

1. **Allocate Sufficient Resources**
   - Ensure adequate RAM and disk space
   - Monitor system resources

2. **Configure Swap**
   - Add swap space if needed (see troubleshooting)

3. **Regular Maintenance**
   - Monitor logs
   - Clean up old logs periodically
   - Backup important data

---

### Useful Docker Commands Reference

#### Container Management

```bash
# Start container
docker start a4h

# Stop container
docker stop a4h

# Restart container
docker restart a4h

# View container status
docker ps

# View all containers (including stopped)
docker ps -a

# View container logs
docker logs a4h
docker logs -f a4h  # Follow logs

# Execute command in container
docker exec -it a4h bash

# View container resource usage
docker stats a4h

# View container details
docker inspect a4h
```

#### SAP System Commands (Inside Container)

```bash
# Access container shell
docker exec -it a4h bash

# Once inside container, check SAP processes
/usr/sap/A4H/SYS/exe/uc/linuxx86_64/sapcontrol -nr 00 -function GetProcessList

# Get system instance list
/usr/sap/A4H/SYS/exe/uc/linuxx86_64/sapcontrol -nr 00 -function GetSystemInstanceList

# Check system properties
/usr/sap/A4H/SYS/exe/uc/linuxx86_64/sapcontrol -nr 00 -function GetSystemProperties
```

#### Docker Image Management

```bash
# List Docker images
docker images

# Remove unused images
docker image prune

# Remove specific image
docker rmi store/saplabs/abaptrial:1909

# Update image (pull latest)
docker pull store/saplabs/abaptrial:1909
```

#### Accessing SAP System

```bash
# Via SAP GUI (if installed on another machine)
# Application Server: <your-ubuntu-server-ip>
# System Number: 00
# Client: 001
# SID: A4H

# Via Web Browser
https://<your-server-ip>:8443/sap/bc/gui/sap/its/webgui

# Via Eclipse ADT
# Use connection details provided above
# Application Server: <your-server-ip>
# SID: A4H
```

#### Network and Ports

```bash
# Check exposed ports
docker port a4h

# Check port mappings
docker inspect a4h | grep -A 10 Ports

# Test port connectivity
telnet localhost 8443
# Or
curl -k https://localhost:8443
```

---

### Additional Resources

#### Official SAP Resources

- **SAP Community**: https://developers.sap.com/
- **SAP Help Portal**: https://help.sap.com/
- **SAP Cloud Appliance Library**: https://cal.sap.com/
- **ABAP Developer Edition Documentation**: Search SAP Community

#### Community Resources

- **SAP Community Forums**: https://community.sap.com/
- **Stack Overflow**: Tag `sap-abap`
- **YouTube Tutorials**: Search "SAP ABAP Developer Edition installation"

#### Project-Specific Resources

- **Technical Architecture**: `Technical_Architecture.md`
- **Development Guide**: `Phase2_Development.md`
- **References**: `References_Resources.md`

---

### Next Steps After Installation

Once your Docker container is running and SAP system is ready:

1. **Verify Installation**
   - [ ] Container is running (`docker ps`)
   - [ ] System is initialized (check logs for "System ready")
   - [ ] Can access web interface (https://your-server:8443)
   - [ ] Can log in via SAP GUI (if installed)
   - [ ] Can connect from Eclipse ADT

2. **Change Default Passwords**
   - [ ] Log into SAP system (web or GUI)
   - [ ] Transaction: SU01
   - [ ] Change DEVELOPER password
   - [ ] Change DDIC password
   - [ ] Change SAP* password

3. **Test Basic Functionality**
   - [ ] Access transaction SE11 (Data Dictionary)
   - [ ] Access transaction SE38 (ABAP Editor)
   - [ ] Create a test program
   - [ ] Verify Eclipse ADT connection works

4. **Prepare for Development**
   - [ ] Review `Phase2_Development.md` for Week 3 tasks
   - [ ] Set up your development package
   - [ ] Ready to create your first table!

5. **Set Up Auto-Start** (Optional)
   - [ ] Configure container to start on boot
   - [ ] Test server reboot to verify auto-start works

---

## Eclipse ADT Setup - Detailed Guide

### Step 1: Install Eclipse IDE

**Download**:
- Go to: https://www.eclipse.org/downloads/
- Download **Eclipse IDE for Enterprise Java and Web Developers**
- Or **Eclipse IDE for Java Developers** (minimum)

**Installation**:
1. Extract the downloaded zip file
2. Run `eclipse.exe` (Windows) or `eclipse` (Linux/Mac)
3. Choose a workspace directory (e.g., `C:\SAP_Workspace`)

**Version**: Latest stable version (2023-12 or newer recommended)

---

### Step 2: Install ABAP Development Tools (ADT)

#### Method 1: Install from Update Site (Recommended)

**Steps**:

1. **Open Eclipse**
   - Launch Eclipse IDE

2. **Open Install Dialog**
   - Go to: `Help` → `Eclipse Marketplace...`
   - Or: `Help` → `Install New Software...`

3. **Add ADT Update Site**
   - Click `Add...` button
   - **Name**: `SAP ABAP Development Tools`
   - **Location**: `https://tools.hana.ondemand.com/latest`
   - Click `Add`

4. **Select ADT Components**
   - Wait for site to load
   - Check: **ABAP Development Tools**
   - Expand to see components:
     - ✅ ABAP Development Tools (Core)
     - ✅ ABAP Development Tools (Optional features as needed)
   - Click `Next`

5. **Review and Install**
   - Review installation details
   - Accept license agreements
   - Click `Finish`

6. **Wait for Installation**
   - Eclipse will download and install ADT
   - Progress shown in bottom-right corner
   - **Time**: 10-30 minutes depending on internet speed

7. **Restart Eclipse**
   - Eclipse will prompt to restart
   - Click `Restart Now`

#### Method 2: Install from Archive (If Update Site Fails)

**Steps**:

1. **Download ADT Archive**
   - Go to: https://tools.hana.ondemand.com/#abap
   - Download latest ADT archive (zip file)

2. **Install from Archive**
   - In Eclipse: `Help` → `Install New Software...`
   - Click `Add...`
   - Click `Archive...`
   - Select downloaded zip file
   - Follow same steps as Method 1

---

### Step 3: Configure ABAP Project Connection

**After ADT Installation**:

1. **Open ABAP Perspective**
   - Go to: `Window` → `Perspective` → `Open Perspective` → `Other...`
   - Select: **ABAP**
   - Click `Open`

2. **Create ABAP Project**
   - Go to: `File` → `New` → `ABAP Project`
   - Or: Right-click in Project Explorer → `New` → `ABAP Project`

3. **Enter Connection Details**
   - **Connection Type**: 
     - Choose `Application Server` (for on-premise)
     - Or `Cloud Foundry` (for SAP BTP)
   
   **For Application Server**:
   - **System ID**: Your system ID (e.g., `DEV`, `QAS`)
   - **Application Server**: Your SAP server hostname or IP
   - **Instance Number**: Your instance number (e.g., `00`, `01`)
   - **System Number**: (if required)
   - **Client**: Your client number (e.g., `100`, `800`)
   - **User**: Your development user
   - **Password**: Your password
   - **Language**: `EN` (English) or your preferred language
   - **Description**: `Personal Practice - Leave System`

4. **Test Connection**
   - Click `Next`
   - Eclipse will test the connection
   - Wait for connection test to complete
   - If successful, click `Next`

5. **Select Transport Organizer**
   - Choose your development package/transport
   - Or create a new local package (for practice)
   - Click `Finish`

6. **Wait for Project Creation**
   - Eclipse will connect and create the project
   - First connection may take 5-10 minutes
   - Progress shown in bottom-right corner

---

### Step 4: Verify ADT Installation

**Check Installation**:

1. **Verify ABAP Perspective**
   - You should see ABAP perspective with:
     - Project Explorer (left)
     - Properties (right)
     - Outline (right)
     - Console (bottom)

2. **Verify Menu Items**
   - Check: `File` → `New` → Should see `ABAP` options:
     - ABAP Class
     - ABAP Program
     - ABAP Package
     - Data Dictionary objects

3. **Test Connection**
   - Expand your project in Project Explorer
   - Should see system connection
   - Right-click project → `Properties` → Check connection status

---

### Step 5: Configure ADT Preferences

**Recommended Settings**:

1. **Open Preferences**
   - Go to: `Window` → `Preferences`
   - Or: `Eclipse` → `Preferences` (Mac)

2. **ABAP Settings**
   - Navigate to: `ABAP Development` → `General`
   - **Code Completion**: Enable all options
   - **Syntax Highlighting**: Enable
   - **Auto-formatting**: Configure as needed

3. **Editor Settings**
   - Navigate to: `ABAP Development` → `Editor`
   - **Tab Policy**: Spaces (recommended: 2 spaces)
   - **Line Numbers**: Show
   - **Word Wrap**: As needed

4. **Code Templates**
   - Navigate to: `ABAP Development` → `Editor` → `Templates`
   - Review and customize code templates

---

## First Coding Steps (Week 3)

### When You Reach Week 3 - Day 1

**Your First Coding Task**: Create ZLEAVE_REQ_HDR Table

---

### Option A: Using Eclipse ADT

**Steps**:

1. **Open ABAP Perspective**
   - Ensure you're in ABAP perspective

2. **Create Data Dictionary Object**
   - Right-click your project → `New` → `Other...`
   - Select: `ABAP` → `Dictionary` → `Database Table`
   - Click `Next`

3. **Enter Table Details**
   - **Name**: `ZLEAVE_REQ_HDR`
   - **Description**: `Leave Request Header`
   - **Package**: Select your package
   - Click `Next`

4. **Configure Table Properties**
   - **Delivery Class**: `A` (Application table)
   - **Data Browser/Table View**: `Display/Maintenance Allowed`
   - Click `Next`

5. **Add Fields**
   - Click `Add Row` for each field
   - Add fields according to design:
     - `MANDT` (Client) - Key field
     - `REQ_ID` (Request ID) - Key field
     - `EMPLOYEE_ID` (Employee Number)
     - `LEAVE_TYPE` (Leave Type)
     - `START_DATE` (Start Date)
     - `END_DATE` (End Date)
     - `DAYS` (Number of Days)
     - `STATUS` (Status)
     - `CREATED_BY` (Created By)
     - `CREATED_DATE` (Creation Date)
     - `APPROVED_BY` (Approved By)
     - `APPROVED_DATE` (Approval Date)
     - `COMMENTS` (Comments)
   - For each field, specify:
     - Field name
     - Data element (create if needed)
     - Key flag (for key fields)
     - Not null flag

6. **Activate Table**
   - Click `Activate` button (or `Ctrl+F3`)
   - Eclipse will activate the table
   - Check for errors in Problems view

7. **Verify Activation**
   - Table should appear in Project Explorer under `Dictionary`
   - Status should show as active

**Reference**: See `Phase2_Development.md` → Week 3 for complete table structure

---

### Option B: Using SAP GUI

**Steps**:

1. **Open SE11**
   - Log into SAP GUI
   - Enter transaction: `SE11`
   - Press Enter

2. **Create Table**
   - Select `Database table`
   - Enter: `ZLEAVE_REQ_HDR`
   - Click `Create`

3. **Enter Description**
   - Short description: `Leave Request Header`
   - Click `Delivery and Maintenance` tab
   - Set: Delivery Class = `A`
   - Set: Data Browser/Table View = `Display/Maintenance Allowed`

4. **Add Fields**
   - Go to `Fields` tab
   - Add each field with data element
   - Mark key fields with key icon

5. **Activate**
   - Click `Activate` button (or `Ctrl+F3`)
   - Save transport request if prompted

---

## Key Transactions Reference

### Development Transactions

| Transaction | Purpose | When to Use | Week |
|-------------|---------|-------------|------|
| **SE11** | Data Dictionary | Create tables, domains, data elements | Week 3 |
| **SE24** | Class Builder | Create ABAP classes | Week 3-4 |
| **SE38** | ABAP Editor | Create ABAP programs | Week 4 |
| **SE51** | Screen Painter | Create screens | Week 4 |
| **SE80** | Object Navigator | Overview of all objects | All weeks |
| **SE37** | Function Builder | Create function modules | Week 3 |
| **SE93** | Maintain Transaction | Create transaction codes | Week 4+ |
| **SWDD** | Workflow Builder | Create workflows | Week 5 |
| **SMARTFORMS** | SmartForms Builder | Create forms | Week 8 |
| **SE80** | Debugger | Debug code | All weeks |

### Eclipse ADT Equivalents

| SAP GUI Transaction | Eclipse ADT Action |
|---------------------|-------------------|
| SE11 | `New` → `Dictionary` → `Database Table` |
| SE24 | `New` → `ABAP Class` |
| SE38 | `New` → `ABAP Program` |
| SE51 | `New` → `Screen` (under program) |
| SE80 | Project Explorer (built-in) |
| SE37 | `New` → `Function Module` |

---

## Recommended Learning Path

### Before Week 3 Coding

**Read These Guides** (if not already familiar):

1. **ABAP Basics**
   - `ABAP-Guides/01_SAP_ABAP_BASICS_GUIDE.md`
   - Focus on: Data types, control structures, naming conventions
   - **Time**: 2-3 hours

2. **Data Dictionary**
   - `ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md`
   - Focus on: Table creation, domains, data elements
   - **Time**: 3-4 hours

3. **ABAP Objects**
   - `ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md`
   - Focus on: Class design, methods, inheritance
   - **Time**: 4-5 hours

**Total Learning Time**: 9-12 hours

---

### Practice Exercises (If You Have Access)

**Before Week 3**:

1. **Practice Table Creation**
   - Create a simple test table (e.g., `ZTEST_TABLE`)
   - Practice with 3-4 fields
   - Activate and test

2. **Practice Class Creation**
   - Create a simple test class (e.g., `ZCL_TEST`)
   - Add a simple method
   - Test the method

3. **Practice Program Creation**
   - Create a simple test program (e.g., `ZTEST_PROGRAM`)
   - Write Hello World
   - Execute and test

---

## Quick Start Checklists

### Week 1 Checklist (Requirements)

```
□ Read project requirements (Abap-4.md)
□ Document functional requirements
□ Document data model requirements
□ Document workflow requirements
□ Document UI/UX requirements
□ Create requirements traceability matrix
□ Review all requirements documents
```

---

### Week 2 Checklist (Design)

```
□ Finalize data dictionary design
□ Design all ABAP classes
□ Design workflow template
□ Design screen layouts
□ Design SmartForm layout
□ Create test plan
□ Review all design documents
```

---

### Week 3 Checklist (First Coding Week)

**Environment Setup**:
```
□ SAP GUI installed OR Eclipse ADT installed
□ Connected to development system
□ Verified access to SE11, SE24, SE38
□ Created development package (if needed)
```

**Day 1 Tasks**:
```
□ Create domain: ZLEAVE_REQ_ID
□ Create data element: ZLEAVE_REQ_ID
□ Create domain: ZLEAVE_STATUS
□ Create data element: ZLEAVE_STATUS
□ Start creating table: ZLEAVE_REQ_HDR
```

**Day 2-3 Tasks**:
```
□ Complete ZLEAVE_REQ_HDR table
□ Create ZLEAVE_REQ_ITEM table
□ Create ZLEAVE_HISTORY table
□ Create ZLEAVE_CONFIG table
□ Activate all tables
```

**Day 4-5 Tasks**:
```
□ Create utility classes
□ Create helper functions
□ Set up workflow structure
□ Create test data
```

---

## Eclipse ADT Tips & Tricks

### Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Code completion |
| `Ctrl+F3` | Activate object |
| `F8` | Execute/Debug |
| `F11` | Step into (debugging) |
| `F10` | Step over (debugging) |
| `Ctrl+Shift+F` | Format code |
| `Ctrl+/` | Comment/Uncomment |
| `Ctrl+D` | Delete line |
| `Alt+Shift+R` | Rename |
| `Ctrl+Shift+O` | Organize imports |

### Useful Views

**Enable These Views**:
- `Window` → `Show View` → `Other...`
- **Problems**: Shows errors/warnings
- **Outline**: Shows structure of current file
- **Console**: Shows output messages
- **Properties**: Shows object properties
- **Search**: Advanced search functionality

### Code Templates

**Create Custom Templates**:
1. `Window` → `Preferences`
2. `ABAP Development` → `Editor` → `Templates`
3. Create templates for common patterns:
   - Class structure
   - Method structure
   - Try-catch blocks
   - etc.

---

## Troubleshooting Common Issues

### Eclipse ADT Issues

**Problem**: ADT installation fails
- **Solution**: Try installing from archive instead of update site
- **Solution**: Check Eclipse version compatibility
- **Solution**: Ensure stable internet connection

**Problem**: Cannot connect to SAP system
- **Solution**: Verify connection details (host, instance, client)
- **Solution**: Check firewall settings
- **Solution**: Verify user credentials and authorizations
- **Solution**: Test connection from SAP GUI first

**Problem**: Objects not activating
- **Solution**: Check for syntax errors in Problems view
- **Solution**: Verify all dependencies exist
- **Solution**: Check transport request assignment

**Problem**: Code completion not working
- **Solution**: Wait for background indexing to complete
- **Solution**: Refresh project (right-click → Refresh)
- **Solution**: Check ADT preferences for code completion settings

---

## Next Steps

### Immediate Actions

1. **If in Week 1-2**: Complete requirements and design documentation
2. **If ready for Week 3**: 
   - Set up Eclipse ADT (if using)
   - Or ensure SAP GUI access
   - Start with first table creation
3. **If stuck**: 
   - Check relevant guide in `ABAP-Guides/`
   - Review `References_Resources.md`
   - Check `Technical_Architecture.md` for design details

### Reference Documents

- **Start Here**: `Phase1_Requirements_Design.md` (Week 1 tasks)
- **Sprint View**: `Sprints/Sprint01_Requirements_Gathering.md`
- **When Coding**: `Phase2_Development.md` (Week 3)
- **Technical Details**: `Technical_Architecture.md`
- **SAP Guides**: `References_Resources.md`
- **Learning Plan**: `Personal_Learning_Plan.md`

---

## Support Resources

### SAP Official Resources

- **SAP Help Portal**: https://help.sap.com
- **SAP Community**: https://community.sap.com
- **ADT Documentation**: https://tools.hana.ondemand.com/#abap
- **ABAP Keyword Documentation**: https://help.sap.com/doc/abapdoc

### Project-Specific Resources

- **Project Overview**: `00_Project_Overview.md`
- **Learning Plan**: `Personal_Learning_Plan.md`
- **Phase Documentation**: `Phase1_Requirements_Design.md`, etc.
- **Sprint Documentation**: `Sprints/README.md`

---

**Last Updated**: 2026  
**Status**: Ready for Development  
**Next Phase**: Week 3 - Foundation & Data Model

