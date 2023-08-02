from typing import List
import math
from PIL import Image
from PIL import PyAccess

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
    
    def stitch(self, output_path, fix_top_rows = False):
        rows = math.ceil(self.height / self.tile_size)
        cols = math.ceil(self.width / self.tile_size)

        print(f"[Atlas] Stitching {self.tilecount} tiles to {cols}x{rows} atlas ({self.width}px x {self.height}px), tile size: {self.tile_size}")
        print(f"[Atlas] Creating canvas...")
        full = Image.new('RGBA', (self.width, self.height), (0,0,0))

        print(f"[Atlas] Stitching atlas...")
        c = 1
        for x in range(0, cols):
            for y in range(0, rows):
                print(f"[Atlas] Processing tile {c} of {self.tilecount} ({(c/self.tilecount)*100:.2f}%) - Tile ({x},{y}) at ({x * self.tile_size}, {y * self.tile_size})          ", end='\r')
                tile = Image.open(self.tiles[x][y])
                full.paste(tile, (x * self.tile_size, y * self.tile_size))
                tile.close()
                c += 1
        print()
        
        if fix_top_rows:
            px = full.load()
            self.fix_top_rows(px)
        
        print(f"[Atlas] Saving to {output_path}...", end='', flush=True)
        full.save(output_path, 'PNG')
        print("OK")
    
    def fix_top_rows(self, full: PyAccess):
        for i in range(0, int(self.height/self.tile_size)):
            print(f"[Atlas] Fixing top row {i} of {int(self.height/self.tile_size)}     ", end='\r',flush=True)
            for x in range(0, self.width):
                y = i * self.tile_size
                if i == 0:
                    full[x,y] = full[x,y+1]
                else:
                    full[x,y] = ( int((full[x,y-1][0] + full[x,y+1][0]) / 2), int((full[x,y-1][1] + full[x,y+1][1]) / 2), int((full[x,y-1][2] + full[x,y+1][2]) / 2) )
        return full