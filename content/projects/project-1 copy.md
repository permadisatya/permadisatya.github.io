---
title: Enterprise Legacy Migration
date: 2024-01-15
image: /images/project-alpha.webp
tags:
  - Go
  - Kubernetes
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor sapien, eleifend a tempus at, egestas vitae quam. Proin dapibus est nec sem cursus volutpat.

## System Architecture

This project involved rewriting a legacy monolithic application into a microservices architecture.

### The Challenge
The original system was built on a 10-year-old PHP framework that was becoming increasingly difficult to maintain.

### The Solution
We gradually extracted core domains into separate services.

1. **User Authentication Service:** Built with Go and gRPC for high performance.
2. **Inventory Management:** Node.js service connecting to a sharded PostgreSQL database.
3. **Order Processing:** Event-driven architecture using Apache Kafka.
