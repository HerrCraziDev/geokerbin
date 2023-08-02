from TileImporter import TileImporter

# Rearranging tiles from SigmaCartographer exports into XYZ

importer = TileImporter(atlas_w=65536, tile_size=256)
atlas = importer.load_tiles("/media/DATA/Games/KSP_GIS_Render/GameData/Sigma/Cartographer/PluginData/Kerbin/tilegen/65/BiomeMap/")

atlas.stitch(output_path="/media/STORAGE/KP-GIS/Raster/Kerbin/kerbin_biome_65k.png", fix_top_rows=False)