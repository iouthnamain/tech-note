# Account Payable Automation – Self-Hosted (Option A)

## 1️⃣ One-Page Architecture Diagram (Textual)

```
┌──────────────┐
│   Vendors    │
│ (XML Invoice)│
└──────┬───────┘
       │  SFTP / API / File Drop
       ▼
┌──────────────────────────┐
│   Linux Host (Ubuntu)    │
│                          │
│  ┌────────────────────┐ │
│  │     Docker Engine  │ │
│  │                    │ │
│  │  ┌──────────────┐  │ │
│  │  │ SAP HANA     │◀─┼─┐│
│  │  │ Express DB   │  │ ││
│  │  └──────────────┘  │ ││
│  │          ▲         │ ││
│  │          │ SQL     │ ││
│  │  ┌──────────────┐  │ ││
│  │  │ SAP NetWeaver│──┘ ││
│  │  │ ABAP AS      │    ││
│  │  │              │    ││
│  │  │  ZAP_* Apps  │    ││
│  │  │  - XML Intake│    ││
│  │  │  - Validate  │    ││
│  │  │  - Post FI   │    ││
│  │  │  - Pay Run   │    ││
│  │  │  - Reports   │    ││
│  │  └──────────────┘    ││
│  └────────────────────┘ ││
│                          ││
│  Shared Volumes          ││
│  ├─ inbound/invoices     ││
│  ├─ outbound/payments    ││
│  └─ logs                 ││
│                          ││
└──────────┬───────────────┘│
           │ SAP GUI / ADT   │
           ▼                 │
     Developer Laptop       │
```

---

## 2️⃣ Option A – Step-by-Step Setup (Command by Command)

### Step 0: Hardware Check

```bash
free -h
lsblk
```

**Required:** ≥16GB RAM, ≥150GB disk

---

### Step 1: Install Docker & Docker Compose

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
reboot
```

Verify:

```bash
docker version
docker-compose version
```

---

### Step 2: Project Folder Structure

```bash
mkdir -p ~/ap-automation/{sap/{hana,abap},inbound/invoices,outbound/payments,logs}
cd ~/ap-automation
```

---

### Step 3: Download SAP Images (Manual – Required)

1. Go to **[https://developers.sap.com/trials-downloads.html](https://developers.sap.com/trials-downloads.html)**
2. Download:

   * SAP NetWeaver AS ABAP Developer Edition
   * SAP HANA Express (Docker)
3. Accept license

Load images:

```bash
docker load -i sap-hana-express.tar
docker load -i sap-abap-dev-edition.tar
```

---

### Step 4: Create `docker-compose.yml`

```yaml
version: "3.8"
services:
  hana:
    image: saplabs/hanaexpress
    container_name: hana
    hostname: hana
    ports:
      - "39013:39013"
    volumes:
      - ./sap/hana:/hana
    mem_limit: 12g

  abap:
    image: sap/abap-developer-edition
    container_name: abap
    hostname: abap
    depends_on:
      - hana
    ports:
      - "3200:3200"
      - "8000:8000"
    volumes:
      - ./sap/abap:/usr/sap
```

---

### Step 5: Start SAP System

```bash
docker-compose up -d
```

Check:

```bash
docker ps
```

---

### Step 6: Access SAP

| Tool          | Value                                          |
| ------------- | ---------------------------------------------- |
| SAP GUI       | localhost:3200                                 |
| ADT (Eclipse) | [http://localhost:8000](http://localhost:8000) |
| Client        | 001                                            |
| User          | DEVELOPER                                      |
| Password      | Down1oad                                       |

---

## 3️⃣ AP Automation – What You Build Inside SAP

### Custom Objects

* Tables: `ZAP_INV_HDR`, `ZAP_INV_ITEM`, `ZAP_LOG`
* Programs:

  * `ZAP_XML_INTAKE`
  * `ZAP_VALIDATE`
  * `ZAP_POST_INVOICE`
  * `ZAP_PAYMENT_RUN`
* Reports:

  * Invoice status ALV
  * Payment summary

### Processing Flow

```
XML Drop → Background Job → Validation → BAPI Post → F110 → Report
```

---

## 4️⃣ Test Run (End-to-End)

```bash
cp sample_invoice.xml inbound/invoices/
```

SAP job picks it up → invoice posted → payment generated → report updated

---

## 5️⃣ Why This Setup Is CV-Strong

* Real SAP system
* End-to-end FI automation
* XML + background jobs
* Payment lifecycle
* Reporting & audit

---

### Next I Can Do

* Draw BPMN diagram
* Write ABAP code for `ZAP_XML_INTAKE`
* Design Z-tables (DDL)
* Convert this into slides / report

Just tell me 👉
