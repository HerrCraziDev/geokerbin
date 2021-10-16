from typing import List
import math
from PIL import Image

# from ZoomLevel import ZoomLevel


class Atlas:

    def __init__(self, width: int, height: int, tile_size: int, tiles = []):
        self.width = width
        self.height = height
        self.tile_size = tile_size
        self.tilecount = len(tiles)
        self.tiles = self.unflatten(tiles)

        # self.zoom_levels: List[ZoomLevel]
    
    def setTiles(self, tiles):
        self.tiles = self.unflatten(tiles)
        self.tilecount = len(tiles)
    
    def getTiles(self):
        return self.tiles

    def unflatten(self, tiles):
        rows = math.ceil(self.height / self.tile_size)
        cols = math.ceil(self.width / self.tile_size)
        output = [[None] * rows for i in range(cols)]
        for x in range(0, cols):
            for y in range(0, rows):
                output[x][y] = tiles[x + y*cols]
        
        return output
    
    def stitch(self, output_path):
        rows = math.ceil(self.height / self.tile_size)
        cols = math.ceil(self.width / self.tile_size)

        print(f"[Atlas] Stitching {self.tilecount} tiles to {cols}x{rows} atlas ({self.width}px x {self.height}px), tile size: {self.tile_size}")
        print(f"[Atlas] Creating canvas...")
        full = Image.new('RGBA', (self.width, self.height), (0,0,0,0))

        print(f"Stitching atlas...")
        c = 1
        for x in range(0, cols):
            for y in range(0, rows):
                print(f"[Atlas] Processing tile {c} of {self.tilecount} ({(c/self.tilecount)*100:.2f}%) - Tile ({x},{y})          ", end='\r')
                with Image.open(self.tiles[x][y]) as tile:
                    full.paste(tile, (x * self.tile_size, y * self.tile_size))
                    tile.close()
                    c += 1
        
        full.save(output_path, 'PNG')
        print("\nFile saved to " + output_path)
