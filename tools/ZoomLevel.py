from typing import List

SuperTile = List[List[str]]

class ZoomLevel:

    def __init__(self, level: int, atlas: Atlas, tiles = []):
        self.level = level
        self.subatlas: List[List[SuperTile]] = None # Format : cols[rows[tiles_to_stitch]], the last level being a 2D array of tiles to stitch together to form the new tile
