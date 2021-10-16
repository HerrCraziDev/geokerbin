from TileImporter import TileImporter

# Rearranging tiles from SigmaCartographer exports into XYZ

importer = TileImporter(atlas_w=32768, tile_size=256)
atlas = importer.load_tiles("/mnt/LinuxData/Games/KSP Sigma/GameData/Sigma/Cartographer/PluginData/Kerbin/Maps/HiRes32/ColorMap")

atlas.stitch(output_path="test.png")