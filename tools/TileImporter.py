import math
import os

from Atlas import Atlas

class TileImporter:

    atlas = []

    def __init__(self,
                 atlas_w: int = None,
                 atlas_h: int = None,
                 tiles_w: int = None,
                 tiles_h: int = None,
                 tile_size: int = 256,
                 zoom_levels=[],
                 auto_levels: bool = True
                ):

        if not tiles_w:
            if atlas_w: tiles_w = math.ceil(atlas_w / tile_size)
            elif tiles_h: tiles_w = 2*tiles_h
        
        if not tiles_h:
            if tiles_w: tiles_h = math.ceil(tiles_w / 2)
            elif atlas_h: tiles_h = math.ceil(atlas_h / tile_size)
            elif atlas_w: tiles_h = math.ceil(atlas_w / 2 / tile_size)
        
        self.atlas_w = atlas_w
        self.atlas_h = atlas_h
        self.tiles_w = tiles_w
        self.tiles_h = tiles_h
        self.tile_size = tile_size
        self.zoom_levels = zoom_levels
        self.auto_levels = auto_levels


        if (not self.atlas_h): 
            self.atlas_h = math.ceil(self.atlas_w / 2)
            print("[TileImporter] 'atlas_h' not set, using half of atlas width.")
        
        print(f"[TileImporter] Atlas size: {self.atlas_w}x{self.atlas_h} ({self.tiles_w} tiles x {self.tiles_h} tiles), tile size: {self.tile_size}px")
        
        if (len(self.zoom_levels) == 0 and self.auto_levels == False):
            print("[TileImporter] ERROR Automatic zoom levels disabled and no zoom levels provided. Use either.")
            raise Exception("No zoom levels provided with 'auto_levels' disabled.")
        
        if (self.atlas_w % self.tile_size or self.atlas_h % self.tile_size):
            raise Exception("'atlas_w' and 'atlas_h' must be multiples of 'tile_size'")
        


    def load_tiles(self, path):
        self.source_path = path
        files = [os.path.join(path, file) for file in os.listdir(path) if os.path.isfile(os.path.join(path, file)) and file.endswith("png")]
        print(f"[TileImporter] {len(files)} tiles found")

        if (len(files) != (self.tiles_w * self.tiles_h)):
            print(f"[TileImporter] WARN Expected {self.tiles_w * self.tiles_h} tiles, found {len(files)}")

        return Atlas(width=self.atlas_w, height=self.atlas_h, tile_size=self.tile_size, tiles=files)
    
