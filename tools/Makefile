
CC=g++
CFLAGS=-g -std=c++20 -Wall -O0 -fdiagnostics-color=always
LDFLAGS=-lgdal -lfmt

gdal_stack: gdal_stack.cpp
	$(CC) $(CFLAGS) gdal_stack.cpp $(LDFLAGS) -o gdal_stack 

build: gdal_stack

run: gdal_stack
	./gdal_stack /media/STORAGE/KP-GIS/Source/raw/kerbin_color_65k.tif MULTIPLY /media/STORAGE/KP-GIS/Source/raw/kerbin_normals_65k.tif

clean:
	rm -rif *.o