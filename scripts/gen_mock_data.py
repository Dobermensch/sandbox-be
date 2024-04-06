import random
import uuid
from datetime import datetime, timedelta

names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]

def generate_inserts(num):
  inserts = []
  base_time = datetime.now()
  for i in range(num):
    player_name = random.choice(names) + str(i)
    score = random.randint(0, 1000)
    created_at = (base_time - timedelta(days=random.randint(0, 365), hours=random.randint(0, 23), minutes=random.randint(0, 59))).isoformat()
    insert_query = f"INSERT INTO scores (player_name, score, created_at) VALUES ('{player_name}', {score}, '{created_at}');"
    inserts.append(insert_query)
  return inserts

# make 120 insert queries
insert_queries = generate_inserts(120)

for query in insert_queries:
  print(query)