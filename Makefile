.PHONY: up shell

up:
	docker compose up -d
	docker compose exec web sh

shell:
	docker compose exec web sh

