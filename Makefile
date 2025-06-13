all:
	# docker compose -f srcs/docker-compose.yml up --build
	docker-compose -f srcs/docker-compose.dev.yml up --build

env:
	cp srcs/backend/api-v1/.env.example srcs/backend/api-v1/.env
