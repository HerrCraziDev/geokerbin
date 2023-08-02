

import 'ol/ol.css';
import { Map as OLMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import ImageLayer from 'ol/layer/Image';
import Projection from "ol/proj/Projection";
import { get as getProjection } from "ol/proj";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Graticule from "ol/layer/Graticule";
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';


console.log("Imported map.js")
var map;
const _tileserver = 'http://tiles-arii.gis.kerbalpowers.org/';
const defaultOptions = {
    title: 'KSP Layer',
    opacity: 1,
    layerIcon: 'images/body-kerbin.png'
}

export default {
    
    createMap(outletID, tileserver)
    {
        if (tileserver) {
            _tileserver = tileserver
        }

        map = new OLMap({
            target: outletID,
            layers: [
                // new TileLayer({
                //     className: 'multiply',
                //     source: new OSM(),
                // })
            ],

            view: new View({
                center: [0, 0],
                //extent: [0,-90,360,90],
                zoom: 3,
                minZoom: 0.1,
                maxZoom: 9,
                multiWorld: true,
                showFullExtent: true,
                projection: 'EPSG:4326'
            })
        })

        const graticuleLabelStyle = {
            font: '10px Calibri,sans-serif',
            fill: new Fill({
                color: 'rgba(255,255,255,1)'
            }),
            stroke: new Stroke({
                color: 'rgba(0,0,0,0.5)',
                width: 3
            })
        };
        const graticule = new Graticule({
            map: map,
            showLabels: true,
            wrapX: true,
            lonLabelStyle: new Text({
                ...graticuleLabelStyle,
                textBaseline: 'bottom'
            }),
            latLabelStyle: new Text({
                ...graticuleLabelStyle,
                textAlign: 'end'
            }),
        })
    },
    
    getOLMap() {
        return map;
    },
    
    getLayers() {
        return map.getLayers().getArray();
    },

    addKerbalLayer(source, tileset, options) {
        let layer = new TileLayer({
            ...{
                source: new XYZ({
                    tileUrlFunction: function (coordinate) {

                        if (coordinate === null) return undefined;

                        // TMS Style URL
                        var z = Math.min(coordinate[0]-1, (tileset.maxZoom ?? source.global.maxZoom));
                        var x = coordinate[1];
                        var y = (Math.pow(2, z)-1) - coordinate[2];
                        var url = (tileset.tileserver ?? source.global.tileserver) + tileset.url + z + '/' + x + '/' + y + '.png';

                        return url;
                    },
                    projection: 'EPSG:4326',
                }),
                useInterimTilesOnError: true,
            },
            ...defaultOptions,
            ...{
                title: tileset.title,
                mapDataSource: tileset.source,
                type: tileset.type,
                body: tileset.body,
                layerIcon: tileset.layerIcon,
                tilesUrl: tileset.url,
                baseUrl: (tileset.tileserver ?? source.global.tileserver)
            },
            ...options,
        });

        map.addLayer(layer)
    }
}
