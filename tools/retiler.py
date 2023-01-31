from TileImporter import TileImporter

# Rearranging tiles from SigmaCartographer exports into XYZ

importer = TileImporter(atlas_w=65536, tile_size=256)
atlas = importer.load_tiles("/mnt/LinuxData/Games/KSP Sigma/GameData/Sigma/Cartographer/PluginData/Kerbin/Maps/hd65k/OceanMap")

atlas.stitch(output_path="kerbin_ocean_mask_65k.png")