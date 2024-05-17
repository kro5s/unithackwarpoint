import asyncio

import asyncpg

asyncio.run(asyncpg.connect('postgresql://postgres@localhost/test'))

class Instance:
    def __init__(self):
        ...

