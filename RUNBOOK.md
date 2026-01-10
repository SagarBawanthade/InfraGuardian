<div align="center">

# 🛡️ RUNBOOK — InfraGuardian

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=00D9FF&center=true&vCenter=true&width=600&lines=Quick+Operational+Guide;Deploy+%26+Manage+with+Helm;Kubernetes+Native+Monitoring" alt="Typing SVG" />

<p align="center">
  <img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes"/>
  <img src="https://img.shields.io/badge/helm-%230F1689.svg?style=for-the-badge&logo=helm&logoColor=white" alt="Helm"/>
  <img src="https://img.shields.io/badge/prometheus-%23E6522C.svg?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus"/>
</p>

</div>

---

## 📋 Prerequisites

```bash
kubectl version --client
helm version
git --version
docker --version
```

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/your-org/infraguardian.git
cd infraguardian
```

### 2. Install with Helm

```bash
helm install infraguardian ./infraguardian
```

✅ **Auto-configured:** Namespace, RBAC, Deployment, Service, Prometheus, Monitoring

### 3. Verify

```bash
helm status infraguardian
kubectl get all -n infraguardian
kubectl logs -f -n infraguardian -l app=infra-guardian-core
```

---

## 📊 Access Services

<table>
<tr>
<td width="33%">

### 🎯 InfraGuardian

```bash
kubectl port-forward -n infraguardian \
  svc/infra-guardian-core 3000:3000

open http://localhost:3000
```

</td>
<td width="33%">

### 🔥 Prometheus

```bash
kubectl port-forward -n infraguardian \
  svc/prometheus-server 9090:80

open http://localhost:9090
```

</td>
<td width="33%">

### 📈 Grafana

```bash
kubectl port-forward -n infraguardian \
  svc/grafana 3001:80

open http://localhost:3001
```

</td>
</tr>
</table>

---

## 🔄 Operations

### Rollback

```bash
helm history infraguardian
helm rollback infraguardian
```

### Uninstall

```bash
helm uninstall infraguardian
kubectl delete namespace infraguardian
```

---

## 🐛 Troubleshooting

### Check Status

```bash
helm list
helm status infraguardian
```

### View Logs

```bash
kubectl logs -f -n infraguardian -l app=infra-guardian-core
kubectl logs -f -n infraguardian --all-containers=true
```

### Debug Resources

```bash
kubectl get all -n infraguardian
kubectl describe pod -n infraguardian <pod-name>
kubectl get events -n infraguardian --sort-by='.lastTimestamp'
```

---

## 🆘 Quick Commands

```bash
# Restart
helm upgrade infraguardian ./infraguardian --force

# Scale
kubectl scale deployment infra-guardian-core -n infraguardian --replicas=3

# Health Check
kubectl port-forward -n infraguardian svc/infra-guardian-core 3000:3000
curl http://localhost:3000/health
```

---

<div align="center">

**Version:** 1.0.0 

</div>