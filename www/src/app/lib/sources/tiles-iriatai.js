/**
 * Enhanced tiles from the 65K atlas - HerrCrazi
 */

export default {
    global: {
        tileserver: "http://tiles-iriatai.gis.kerbalpowers.org/",
        maxZoom: 7,
    },

    kerbin: {
        biome: {
            title: 'Kerbin (biomes)',
            layerIcon: '/images/body-kerbin.png',
            url: 'tiles/kerbin/biome/',
            type: 'biome',
            body: 'Kerbin',
            source: 'HerrCrazi (herrcrazi@gmail.com) - Map data courtesy of Kerbal Space Program'
        },
        elevation: {
            title: 'Kerbin (elevation)',
            layerIcon: '/images/body-kerbin.png',
            url: 'tiles/kerbin/elevation/',
            type: 'elevation',
            body: 'Kerbin',
            source: 'HerrCrazi (herrcrazi@gmail.com) - Map data courtesy of Kerbal Space Program'
        },
        normal: {
            title: 'Kerbin 65K (normal map)',
            layerIcon: '/images/body-kerbin.png',
            url: 'tiles/kerbin/normal/',
            type: 'normal',
            body: 'Kerbin',
            source: 'HerrCrazi (herrcrazi@gmail.com) - Map data courtesy of Kerbal Space Program'
        },
        sat: {
            title: 'Kerbin 65K (terrain color)',
            layerIcon: '/images/body-kerbin.png',
            url: 'tiles/kerbin/terrain/',
            type: 'sat',
            body: 'Kerbin',
            source: 'HerrCrazi (herrcrazi@gmail.com) - Map data courtesy of Kerbal Space Program'
        },
        slope: {
            title: 'Kerbin (slope)',
            layerIcon: '/images/body-kerbin.png',
            url: 'tiles/kerbin/slope/',
            type: 'slope',
            body: 'Kerbin',
            source: 'HerrCrazi (herrcrazi@gmail.com) - Map data courtesy of Kerbal Space Program'
        }
    }
}