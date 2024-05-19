import asyncio
import os

# import nest_asyncio
# nest_asyncio.apply()

import asyncpg
from tortoise import run_async
from tortoise import Tortoise

import models



if __name__ == "__main__":
    run_async(init())
