# Sandbox take home test - backend
## Local installation order
1. This Backend repo
2. Leaderboard frontend
3. Game repo

## Setup
1. cd to this project directory
2. Run `docker compose up`
3. Once the postgres service is running, connect to postgres (connection credentials in docker-compose.yml file) and run `1-create-scores-table.sql` in the migrations folder to create the database.
4. The project should be running on port 3001.

Optional step
If you want to generate mock data for the database, you may run `python ./scripts/gen_mock_data.py` which will generate 120 insert queries for your database or copy the insert queries from `./migrations/2-insert-mock-data.sql`. Then execute those queries on the `postgres` docker service.

## View REST API documentation
Once the project is running, nagivate to http://localhost:3001/documentation

## View websocket API documentation
1. Navigate to `https://studio.asyncapi.com/` in the browser
2.  Copy the file `./docs/websockets.yaml`.
3. Paste the file in `https://studio.asyncapi.com/`