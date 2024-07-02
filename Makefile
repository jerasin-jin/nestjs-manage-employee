# alias m=make
.DEFAULT_GOAL:= dev
.PHONY: dev build up start down destroy stop restart logs logs-slim ps
dev: destroy build up logs
build:
	@COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build $(c)
up:
	@docker-compose up -d $(c)
logs:
	@docker-compose logs --tail=100 -f $(c)
destroy:
	@docker-compose down -v $(c)
stop:
	@docker-compose	stop $(c)
down:
	@docker-compose down $(c)
# migration:
# 	yarn typeorm migration:create -n $()
generate:
	yarn nx generate @nrwl/nest:library $(c) --controller --service 
permission-start:
	-sudo chomd -R 777 db-data
permission-end:
	-sudo chomd -R 777 db-data