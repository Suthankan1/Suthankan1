<p align="center">
  <img src="./assets/profile-banner.svg" alt="Suthankan Balenthiran - software engineering intern focused on backend, distributed systems, and cloud" width="100%" />
</p>

<p align="center">
  <a href="https://www.suthankan.tech/"><img src="https://img.shields.io/badge/Portfolio-111827?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" /></a>
  <a href="https://www.suthankan.tech/cv/Suthankan_B_SE.pdf"><img src="https://img.shields.io/badge/Software_Engineering_CV-2563EB?style=for-the-badge&logo=readme&logoColor=white" alt="Software Engineering CV" /></a>
  <a href="https://www.suthankan.tech/cv/Suthankan_B_DevOps.pdf"><img src="https://img.shields.io/badge/DevOps_CV-0F766E?style=for-the-badge&logo=readme&logoColor=white" alt="DevOps CV" /></a>
  <a href="https://www.linkedin.com/in/suthankan/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:suthankanbala2019@gmail.com"><img src="https://img.shields.io/badge/Email-16A34A?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Open_to-Software_Engineering_%26_DevOps_Internships-16A34A?style=flat-square" alt="Open to Software Engineering and DevOps internships" />
  <img src="https://img.shields.io/badge/Based_in-Sri_Lanka-0F766E?style=flat-square" alt="Based in Sri Lanka" />
</p>

## Profile

I am an Information Technology undergraduate at the **University of Moratuwa** building backend, distributed, and cloud-native systems. My work focuses on explicit service boundaries, reliable communication, secure execution, PostgreSQL persistence, automated testing, observability, and delivery through containers and CI/CD.

I am seeking a **Software Engineering, Backend, Platform, or DevOps internship** where I can contribute to production-minded systems and grow alongside experienced engineers.

- BSc (Hons) in Information Technology, 2024-2028
- Semester GPAs: L1S1 **3.76**, L1S2 **3.72**, L2S1 **3.74**
- Primary stack: Java, Go, C#/.NET, Spring Boot, PostgreSQL, Docker, and AWS
- Engineering interests: distributed systems, platform reliability, API security, and cloud infrastructure

## Flagship Engineering Work

### VoltGrid - Distributed EV Charging Network Platform

A reproducible distributed system for EV charging operations. Three independently owned Spring Boot services communicate through OCPP 2.0.1 WebSockets, gRPC, and Kafka, with PostgreSQL persistence boundaries and GraphQL operational APIs.

Implemented transactional outbox publishing, idempotent consumers, duplicate and out-of-order event handling, OpenTelemetry propagation, Testcontainers integration tests, Docker Compose, Terraform, and a verified AWS ECS deployment that was intentionally retired after the deployment milestone.

`Java 25` `Spring Boot 4` `OCPP 2.0.1` `gRPC` `Kafka` `GraphQL` `PostgreSQL` `OpenTelemetry` `Terraform` `AWS`

[Repository](https://github.com/Suthankan1/voltgrid) | [Architecture and local demo](https://github.com/Suthankan1/voltgrid/blob/main/README.md)

### ProofMesh - Runtime Governance for Autonomous Agents

A security-focused runtime governance platform that separates policy decisions from tool execution. A Spring Boot control plane evaluates policy, risk, and human approvals before issuing short-lived execution grants to a Go enforcement gateway.

The gateway verifies ES256 grants offline, enforces exact request binding, blocks replay through durable PostgreSQL claims, strips credentials before forwarding, and fails closed on invalid or unavailable dependencies.

`Java 25` `Spring Modulith` `Go` `PostgreSQL` `Keycloak` `OIDC` `ES256/JWKS` `RFC 8785` `Testcontainers`

[Repository](https://github.com/Suthankan1/proofmesh) | [Security model](https://github.com/Suthankan1/proofmesh#security-model--invariants)

### Planora - Agile Project Management System

**Team Lead | Five-person team**

Led backlog planning, architecture discussions, code reviews, and delivery coordination for a full-stack Scrum and Kanban platform. Contributed across the Next.js frontend, Spring Boot backend, React Native and PWA experiences, PostgreSQL workflows, security improvements, and CI/CD.

`Next.js` `React Native` `Java` `Spring Boot` `PostgreSQL` `CI/CD` `Scrum` `Kanban`

[Live application](https://planora-pma.netlify.app/) | [Repository](https://github.com/axzellinnovations/project_management_app) | [My contributions](https://github.com/axzellinnovations/project_management_app/commits?author=Suthankan1)

## Currently Building

### SettleCore - Payment Operations and Reconciliation

An early-stage C#/.NET 10 backend for payment lifecycle management, provider-reference uniqueness, status transitions, PostgreSQL persistence, and reconciliation-oriented workflows. Development currently emphasizes domain invariants, EF Core migrations, automated unit and integration testing, and strict CI quality gates.

`C#` `.NET 10` `ASP.NET Core` `EF Core` `PostgreSQL` `Integration Testing` `GitHub Actions`

[Repository](https://github.com/Suthankan1/SettleCore)

## Open-Source Contributions

| Project | Contribution | Status |
| --- | --- | --- |
| Telegram Desktop | [Fix Mini App cookies on Linux](https://github.com/telegramdesktop/tdesktop/pull/31086) | Merged |
| lib_webview | [Allow third-party cookies when requested](https://github.com/desktop-app/lib_webview/pull/146) | Merged |
| Testcontainers Java | [Avoid changing the global uncaught exception handler](https://github.com/testcontainers/testcontainers-java/pull/12076) | Under review |
| Ballerina HTTP | [Fix ambiguity diagnostics for HTTP service classes and objects](https://github.com/ballerina-platform/module-ballerina-http/pull/2710) | Under review |
| Ballerina YAML | [Fix scalar tag regex matching](https://github.com/ballerina-platform/module-ballerina-data.yaml/pull/43) | Under review |
| WSO2 API Manager | [Fix unnecessary Lambda resource request for API products](https://github.com/wso2/apim-apps/pull/1424) | Under review |

Another active patch improves concurrent proxy checks in [Telegram Desktop](https://github.com/telegramdesktop/tdesktop/pull/31112).

## Technical Toolbox

<table>
  <tr>
    <td><strong>Languages</strong></td>
    <td>Java, Go, C#, TypeScript, JavaScript, Python, C, SQL</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Spring Boot, Spring Modulith, ASP.NET Core, REST APIs, GraphQL, gRPC, Protocol Buffers</td>
  </tr>
  <tr>
    <td><strong>Distributed Systems</strong></td>
    <td>Kafka, transactional outbox, idempotency, concurrency control, OCPP 2.0.1, WebSockets</td>
  </tr>
  <tr>
    <td><strong>Security</strong></td>
    <td>Spring Security, Keycloak, OIDC, JWT/JWS, ES256, JWKS, fail-closed validation</td>
  </tr>
  <tr>
    <td><strong>Data and Testing</strong></td>
    <td>PostgreSQL, Flyway, EF Core, Testcontainers, unit and integration testing</td>
  </tr>
  <tr>
    <td><strong>Cloud and Platform</strong></td>
    <td>Linux, Docker, AWS ECS/RDS/VPC, Terraform, GitHub Actions, OpenTelemetry, Cloudflare</td>
  </tr>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React, Next.js, React Native, Progressive Web Apps, HTML, CSS</td>
  </tr>
</table>

## Additional Work

- **[GrantAI](https://github.com/Suthankan1/grantai)** - Semantic grant matching, application tracking, streamed AI writing, and interview practice across Next.js, Spring Boot, FastAPI, pgvector, Redis, and Docker.
- **[MindTrack](https://github.com/Suthankan1/mindtrack)** - Cross-platform wellbeing system built with Flutter, Next.js, Spring Boot, mood analytics, AI insights, therapist discovery, and crisis resources.
- **[OmniHealth](https://github.com/Suthankan1/OmniHealth)** - Hospital management ecosystem covering clinical, pharmacy, billing, diagnostics, emergency, HR, and administrative workflows.
- **[Solar](https://github.com/Suthankan1/solar)** - C++ and OpenGL solar-system simulation with custom shaders, textured celestial bodies, lighting, bloom, and scene components.

## Education and Credentials

**University of Moratuwa**<br />
Bachelor of Science Honours in Information Technology<br />
2024-2028

- REST API (Intermediate), HackerRank - 2026
- AWS Educate Introduction to Cloud 101 - 2026
- Linux for Cloud and DevOps Engineers, Packt - 2026
- CCNA: Introduction to Networks, Cisco - 2026
- Postman API Fundamentals Student Expert - 2025
- Developing Front-End Apps with React, IBM - 2025

## Leadership and Community

- **Customer Relations Team Leader, AIESEC** - Led stakeholder engagement, cross-functional coordination, task ownership, and delivery follow-up.
- **Microsoft Learn Student Ambassador - Alpha** - Promoted technical learning and facilitated discussions around software engineering practices and Microsoft development tools.

---

<p align="center">
  Open to Software Engineering, Backend, Platform, and DevOps internship opportunities.
  <br />
  <a href="mailto:suthankanbala2019@gmail.com"><strong>Start a conversation</strong></a>
</p>
