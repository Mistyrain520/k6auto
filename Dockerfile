FROM golang:1.23-alpine3.20 AS builder

# 安装必要的依赖包
RUN apk update && \
    apk add --no-cache git

# 安装 xk6
RUN GOBIN=/root/go/bin go install go.k6.io/xk6/cmd/xk6@latest

# 切换到默认安装路径
WORKDIR /root/go/bin

# 检查安装的 xk6 是否存在
RUN ls -l xk6

# 执行 xk6 构建命令
RUN ./xk6 build --with github.com/Mistyrain520/xk6-zap@latest --with github.com/grafana/xk6-sql

# 第二阶段：最终镜像
FROM golang:1.23-alpine3.20

# 设置工作目录
WORKDIR /home/xk6
COPY . .
# 从构建阶段复制生成的 xk6 可执行文件到工作目录
COPY --from=builder /root/go/bin/k6 /home/xk6/k6

# 设置执行权限
RUN chmod +x /home/xk6/k6

# 设置默认执行命令为一个不产生任何输出的命令
CMD ["tail", "-f", "/dev/null"]