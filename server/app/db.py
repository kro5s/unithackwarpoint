import asyncio
import os

# import nest_asyncio
# nest_asyncio.apply()
import asyncpg

class DB:
    def __init__(self):
        loop = asyncio.get_event_loop()
        loop.create_task(self.init())
        # asyncio.run(self.init())

    async def init(self):
        # print(os.getenv("POSTGRES_PASSWORD"))
        # print(os.getenv("POSTGRES_DB"))
        self.conn = await asyncpg.connect(
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
            database=os.getenv("POSTGRES_DB"),
            host=os.getenv("POSTGRES_ADDRESS")
        )

if __name__ == "__main__":
    db = DB()