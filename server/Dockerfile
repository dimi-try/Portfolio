# Билд
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Продакшен
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY ./app ./app
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]