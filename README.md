<div align="center">

  <!-- HERO BANNER -->
  <img src="./assets/profile-super-banner.svg" alt="Suthankan Balenthiran - Software Engineer specializing in Backend, Distributed Systems and Cloud" width="100%" />

  <br /><br />

  <!-- QUICK ACTION DOCK / BADGES -->
  <a href="https://www.suthankan.tech/">
    <img src="https://img.shields.io/badge/PORTFOLIO-suthankan.tech-0B132B?style=for-the-badge&logo=vercel&logoColor=38BDF8&color=0B132B" alt="Portfolio" />
  </a>
  <a href="https://www.suthankan.tech/cv/Suthankan_B_SE.pdf">
    <img src="https://img.shields.io/badge/SOFTWARE_ENGINEERING_CV-PDF-0284C7?style=for-the-badge&logo=googledocs&logoColor=white" alt="Software Engineering CV" />
  </a>
  <a href="https://www.suthankan.tech/cv/Suthankan_B_DevOps.pdf">
    <img src="https://img.shields.io/badge/DEVOPS_CV-PDF-0D9488?style=for-the-badge&logo=cloudbees&logoColor=white" alt="DevOps CV" />
  </a>
  <a href="https://www.linkedin.com/in/suthankan/">
    <img src="https://img.shields.io/badge/LINKEDIN-suthankan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="mailto:suthankanbala2019@gmail.com">
    <img src="https://img.shields.io/badge/EMAIL-suthankanbala2019@gmail.com-10B981?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>

  <br /><br />

  <!-- STATUS STRIP -->
  <img src="https://img.shields.io/badge/🎯_SEEKING-Software_Engineering_%7C_Backend_%7C_Platform_%7C_DevOps_Internships-10B981?style=flat-square&labelColor=064E3B" alt="Internship Status" />
  <img src="https://img.shields.io/badge/📍_LOCATION-Sri_Lanka_%E2%80%A2_Open_to_Remote_Worldwide-0284C7?style=flat-square&labelColor=082F49" alt="Location" />
  <img src="https://img.shields.io/badge/🏛️_ALMA_MATER-University_of_Moratuwa-8B5CF6?style=flat-square&labelColor=3B0764" alt="University of Moratuwa" />

  <br /><br />

  <!-- DEVELOPER TERMINAL WIDGET -->
  <img src="./assets/terminal-whoami.svg" alt="Suthankan's Developer Terminal" width="100%" />

  <br /><br />

  <!-- EXECUTIVE METRICS BAR -->
  <img src="./assets/metrics-bar.svg" alt="Key Engineering Metrics: 3.74 GPA, 4 Flagships, 6+ Upstream PRs, Zero-Trust" width="100%" />

</div>

<br />

---

## ⚡ Executive Overview

I am an Information Technology undergraduate at the **University of Moratuwa** building resilient backend, distributed, and cloud-native systems. My engineering methodology emphasizes **deterministic service boundaries**, **transactional outbox event streaming**, **fail-closed runtime security**, **PostgreSQL persistence guarantees**, and **end-to-end observability**.

* 🎓 **Academic Excellence:** BSc (Hons) in Information Technology (2024–2028) · Semester GPAs: L1S1 **3.76**, L1S2 **3.72**, L2S1 **3.74**.
* 🛠️ **Primary Stack:** Java (Spring Boot 4, Spring Modulith), Go, C# (.NET 10), PostgreSQL, Kafka, Docker, and AWS.
* 🛡️ **Core Philosophy:** "Design with invariants first, verify with integration tests via Testcontainers, and automate delivery with immutable infrastructure."
* 🚀 **Objective:** Seeking a **Software Engineering, Backend, Platform, or DevOps Internship** to deploy high-leverage production code and collaborate with high-caliber engineering teams.

---

## 🏗️ Flagship Engineering Systems

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ VoltGrid</h3>
      <p><strong>Distributed EV Charging Network Platform</strong></p>
      <p>A production-model distributed architecture simulating high-load EV charging infrastructure across 3 independently deployable Spring Boot microservices communicating via <strong>OCPP 2.0.1 WebSockets</strong>, <strong>gRPC</strong>, and <strong>Apache Kafka</strong>.</p>
      <ul>
        <li>Implemented <strong>Transactional Outbox pattern</strong> to prevent dual-write anomalies between PostgreSQL and Kafka.</li>
        <li>Built idempotent consumers handling out-of-order and duplicate telemetry events.</li>
        <li>End-to-end distributed tracing via <strong>OpenTelemetry</strong> context propagation.</li>
        <li>Automated validation with <strong>Testcontainers</strong>; cloud-provisioned on <strong>AWS ECS</strong> via <strong>Terraform</strong>.</li>
      </ul>
      <p>
        <code>Java 25</code> <code>Spring Boot 4</code> <code>OCPP 2.0.1</code> <code>gRPC</code> <code>Kafka</code> <code>GraphQL</code> <code>PostgreSQL</code> <code>AWS ECS</code> <code>Terraform</code>
      </p>
      <p>
        🔗 <a href="https://github.com/Suthankan1/voltgrid"><strong>Repository</strong></a> &nbsp;|&nbsp; 
        📐 <a href="https://github.com/Suthankan1/voltgrid/blob/main/README.md"><strong>Architecture &amp; Local Demo</strong></a>
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>🛡️ ProofMesh</h3>
      <p><strong>Runtime Governance &amp; Security for Autonomous Agents</strong></p>
      <p>A zero-trust runtime policy enforcement engine decoupling policy reasoning from tool execution. Features a <strong>Spring Modulith</strong> control plane evaluating human approvals, paired with a high-throughput <strong>Go</strong> enforcement gateway.</p>
      <ul>
        <li>Validates short-lived <strong>ES256 cryptographic grants</strong> offline via JWKS.</li>
        <li>Enforces exact request binding with <strong>RFC 8785 JSON canonicalization</strong>.</li>
        <li>Durable PostgreSQL claims preventing token replay attacks.</li>
        <li>Strips sensitive upstream credentials and defaults to strict <strong>fail-closed</strong> execution.</li>
      </ul>
      <p>
        <code>Java 25</code> <code>Spring Modulith</code> <code>Go</code> <code>PostgreSQL</code> <code>Keycloak</code> <code>OIDC</code> <code>ES256 / JWKS</code> <code>RFC 8785</code> <code>Testcontainers</code>
      </p>
      <p>
        🔗 <a href="https://github.com/Suthankan1/proofmesh"><strong>Repository</strong></a> &nbsp;|&nbsp; 
        🔒 <a href="https://github.com/Suthankan1/proofmesh#security-model--invariants"><strong>Security Invariants</strong></a>
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>💳 SettleCore</h3>
      <p><strong>Payment Operations &amp; Financial Reconciliation</strong></p>
      <p>A high-performance C# / .NET 10 backend dedicated to payment lifecycle management, provider-reference uniqueness, idempotent transitions, and financial reconciliation.</p>
      <ul>
        <li>Domain invariants enforced at database &amp; application layers.</li>
        <li>Zero-data-loss database versioning with <strong>EF Core migrations</strong> on PostgreSQL.</li>
        <li>Full test suite with unit tests and containerized integration test harnesses.</li>
        <li>Strict CI/CD quality gates on GitHub Actions verifying build contracts.</li>
      </ul>
      <p>
        <code>C#</code> <code>.NET 10</code> <code>ASP.NET Core</code> <code>EF Core</code> <code>PostgreSQL</code> <code>GitHub Actions</code> <code>Integration Testing</code>
      </p>
      <p>
        🔗 <a href="https://github.com/Suthankan1/SettleCore"><strong>Repository</strong></a>
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>👥 Planora</h3>
      <p><strong>Agile Project Management Platform</strong></p>
      <p><strong>Role: Team Lead (5-person engineering team)</strong><br />
      Spearheaded architectural design, sprint planning, and code reviews for a multi-platform Scrum &amp; Kanban productivity application.</p>
      <ul>
        <li>Led backlog prioritization and sprint execution adhering to Scrum principles.</li>
        <li>Contributed across Next.js frontend, Spring Boot backend, and React Native mobile client.</li>
        <li>Optimized PostgreSQL queries, transactional workflows, and role-based ACLs.</li>
        <li>Automated deployment pipeline with continuous integration.</li>
      </ul>
      <p>
        <code>Next.js</code> <code>React Native</code> <code>Java</code> <code>Spring Boot</code> <code>PostgreSQL</code> <code>CI/CD</code> <code>Scrum</code>
      </p>
      <p>
        🌐 <a href="https://planora-pma.netlify.app/"><strong>Live App</strong></a> &nbsp;|&nbsp; 
        🔗 <a href="https://github.com/axzellinnovations/project_management_app"><strong>Repository</strong></a> &nbsp;|&nbsp; 
        💻 <a href="https://github.com/axzellinnovations/project_management_app/commits?author=Suthankan1"><strong>My Commits</strong></a>
      </p>
    </td>
  </tr>
</table>

---

## 🌐 Open-Source Contributions & Upstream Patches

Contributing upstream to battle-tested production software and industry developer tooling:

| Ecosystem / Project | Upstream Contribution | Impact &amp; Technical Scope | Status |
| :--- | :--- | :--- | :---: |
| **Telegram Desktop** | [PR #31086: Fix Mini App cookies on Linux](https://github.com/telegramdesktop/tdesktop/pull/31086) | Resolved cookie persistence and session drop bug in Telegram Webview on Linux desktop client. | `MERGED` |
| **lib_webview** | [PR #146: Allow third-party cookies when requested](https://github.com/desktop-app/lib_webview/pull/146) | Enabled third-party cookie handling required for embedded web applications and authenticated views. | `MERGED` |
| **Telegram Desktop** | [PR #31112: Improve concurrent proxy check routine](https://github.com/telegramdesktop/tdesktop/pull/31112) | Optimized thread safety and connection handling across concurrent network proxy diagnostics. | `UNDER REVIEW` |
| **Testcontainers Java** | [PR #12076: Avoid overriding global uncaught exception handler](https://github.com/testcontainers/testcontainers-java/pull/12076) | Prevents test runner pollution by isolating thread exception handling during container lifecycles. | `UNDER REVIEW` |
| **Ballerina HTTP** | [PR #2710: Fix ambiguity diagnostics for service classes](https://github.com/ballerina-platform/module-ballerina-http/pull/2710) | Corrected compiler ambiguity detection for HTTP service class bindings and dispatch endpoints. | `UNDER REVIEW` |
| **Ballerina YAML** | [PR #43: Fix scalar tag regex pattern matching](https://github.com/ballerina-platform/module-ballerina-data.yaml/pull/43) | Patched regex evaluation for strict YAML spec scalar tag compliance. | `UNDER REVIEW` |
| **WSO2 API Manager** | [PR #1424: Eliminate unnecessary Lambda resource requests](https://github.com/wso2/apim-apps/pull/1424) | Removed redundant resource allocation calls in API product publishing workflow. | `UNDER REVIEW` |

---

## 🛠️ Comprehensive Technical Matrix

<div align="center">

| Domain | Technologies &amp; Methodologies |
| :--- | :--- |
| **Core Languages** | `Java 25` · `Go (Golang)` · `C# (.NET 10)` · `TypeScript` · `JavaScript` · `Python` · `C / C++` · `SQL` |
| **Backend &amp; Distributed Systems** | `Spring Boot 4` · `Spring Modulith` · `ASP.NET Core` · `Apache Kafka` · `gRPC & Protobuf` · `GraphQL` · `RESTful APIs` · `WebSockets` · `OCPP 2.0.1` |
| **Reliability &amp; Architecture Patterns** | `Transactional Outbox` · `Idempotent Consumers` · `Domain-Driven Design (DDD)` · `Event-Driven Architecture` · `Microservices` · `State Machine Transitions` |
| **Security &amp; Identity** | `Keycloak` · `OAuth 2.0 / OIDC` · `ES256 / JWKS` · `RFC 8785 Canonical JSON` · `Spring Security` · `JWT/JWS` · `Fail-Closed Zero Trust` |
| **Databases &amp; Caching** | `PostgreSQL` · `Redis` · `Flyway Migrations` · `EF Core` · `Hibernate / JPA` · `pgvector` · `Connection Pooling (HikariCP)` |
| **Cloud, Platform &amp; DevOps** | `Docker & Docker Compose` · `AWS (ECS, RDS, VPC, IAM)` · `Terraform (IaC)` · `Linux (Ubuntu/Debian)` · `GitHub Actions CI/CD` · `Cloudflare` |
| **Observability &amp; Quality** | `OpenTelemetry (OTel)` · `Prometheus` · `Testcontainers` · `JUnit 5` · `MockMvc` · `xUnit` |
| **Frontend &amp; Cross-Platform** | `React.js` · `Next.js` · `React Native` · `Tailwind CSS` · `Flutter` · `PWA` |

</div>

---

## 📈 GitHub Telemetry & Activity

<div align="center">
  <table border="0">
    <tr>
      <td align="center">
        <a href="https://github.com/Suthankan1">
          <img src="https://github-readme-stats.vercel.app/api?username=Suthankan1&show_icons=true&theme=tokyonight&hide_border=true&bg_color=090D16&title_color=38BDF8&icon_color=38BDF8&text_color=94A3B8" alt="Suthankan's GitHub Stats" />
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Suthankan1">
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Suthankan1&layout=compact&theme=tokyonight&hide_border=true&bg_color=090D16&title_color=38BDF8&text_color=94A3B8" alt="Top Languages" />
        </a>
      </td>
    </tr>
  </table>
  <a href="https://github.com/Suthankan1">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=Suthankan1&theme=tokyonight&hide_border=true&background=090D16&ring=38BDF8&fire=F43F5E&currStreakLabel=38BDF8" alt="GitHub Streak" />
  </a>
</div>

---

## 🚀 Additional Engineering Projects

<details>
  <summary><strong>🔍 Click to expand additional multi-stack projects</strong></summary>
  <br />

  * 🎯 **[GrantAI](https://github.com/Suthankan1/grantai)** — Intelligent grant discovery and application workflow suite. Combines Next.js, Spring Boot, FastAPI, pgvector semantic search, Redis caching, and Docker.
  * 🧠 **[MindTrack](https://github.com/Suthankan1/mindtrack)** — Cross-platform wellbeing system with Flutter mobile frontend, Next.js dashboard, and Spring Boot backend delivering AI insights and crisis resource routing.
  * 🏥 **[OmniHealth](https://github.com/Suthankan1/OmniHealth)** — Complete hospital management ecosystem featuring clinical records, pharmacy inventory, billing workflows, and containerized deployment.
  * 🌌 **[Solar](https://github.com/Suthankan1/solar)** — Real-time 3D planetary physics and rendering engine built with C++ and modern OpenGL, featuring custom GLSL shaders, camera matrices, lighting, and bloom passes.
  * 🌐 **[Personal Portfolio](https://github.com/Suthankan1/suthankan-portfolio)** — Modern developer portfolio engineered with Next.js, TypeScript, MDX case studies, and automated edge deployment.
</details>

---

## 🎓 Education & Industry Credentials

### 🏛️ University of Moratuwa
**Bachelor of Science Honours in Information Technology** · *2024 – 2028*  
* Semester GPAs: **L1S1: 3.76** | **L1S2: 3.72** | **L2S1: 3.74**  
* Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Software Development, Database Management Systems, Computer Networks, Operating Systems, Software Architecture.

### 📜 Verified Industry Certifications
* **AWS Educate** — Introduction to Cloud 101 *(2026)*
* **Cisco Networking Academy** — CCNA: Introduction to Networks *(2026)*
* **HackerRank** — REST API (Intermediate) Certificate *(2026)*
* **Packt** — Linux for Cloud &amp; DevOps Engineers *(2026)*
* **Postman** — Postman API Fundamentals Student Expert *(2025)*
* **IBM** — Developing Front-End Apps with React *(2025)*

---

## 🌟 Leadership & Community Impact

* 🤝 **Customer Relations Team Leader | AIESEC** — Led cross-functional teams in stakeholder communications, sprint delivery follow-ups, and international exchange operations.
* 💡 **Microsoft Learn Student Ambassador (Alpha) | Microsoft** — Organized peer learning workshops on cloud fundamentals, modern developer tooling, and clean code practices.

---

<div align="center">

  ### 🤝 Let's Build Something Exceptional Together

  I am actively interviewing for **Software Engineering, Backend, Platform, and DevOps Internships**.  
  Whether you are architecting distributed services or looking for a fast-learning engineer with high ownership:

  <br />

  <a href="mailto:suthankanbala2019@gmail.com">
    <img src="https://img.shields.io/badge/START_A_CONVERSATION-suthankanbala2019@gmail.com-10B981?style=for-the-badge&logo=minutemailer&logoColor=white" alt="Start a Conversation" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/suthankan/">
    <img src="https://img.shields.io/badge/CONNECT_ON_LINKEDIN-Suthankan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="Connect on LinkedIn" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.suthankan.tech/">
    <img src="https://img.shields.io/badge/VISIT_PORTFOLIO-suthankan.tech-0B132B?style=for-the-badge&logo=safari&logoColor=38BDF8" alt="Visit Portfolio" />
  </a>

  <br /><br />

  <sub>Crafted with precision by <strong>Suthankan Balenthiran</strong> · University of Moratuwa</sub>

</div>
