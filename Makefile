.PHONY: up shell

up:
	docker compose up -d

shell:
	docker compose up -d
	docker compose exec web sh
