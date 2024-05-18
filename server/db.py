import asyncio

import asyncpg


class DB:
    def __init__(self):
        asyncio.run(asyncpg.connect(
            user="postgres",
            password="123",
            database="test"
        ))

if __name__ == "__main__":
    db = DB()