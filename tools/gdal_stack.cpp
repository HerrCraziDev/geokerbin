
#include <iostream>
#include <fmt/core.h>
#include <filesystem>
#include <vector>
#include <gdal_priv.h>
namespace fs = std::filesystem;


#define ERR_FOPEN -1
#define ERR_INVALID_BLEND -2
#define ERR_MEM_ALLOC -3


#define INFO(...) std::cout << fmt::format("[\e[36m{}\e[39m]\t", __FUNCTION__) << fmt::format(__VA_ARGS__)
#define ERROR(...) std::cerr << fmt::format("[\e[31m{}\e[39m]\t", __FILE__) << fmt::format(__VA_ARGS__)


typedef struct vec2 {
    int x;
    int y;
} vec2;

typedef enum BlendMode {
    ADD,
    SUBSTRACT,
    MULTIPLY,
    DIVIDE,
    OVERLAY,
    SCREEN,
    LIGHTEN,
    DARKEN,
} BlendMode;

const char* BlendModeStr[]{
    "ADD",
    "SUBSTRACT",
    "MULTIPLY",
    "DIVIDE",
    "OVERLAY",
    "SCREEN",
    "LIGHTEN",
    "DARKEN",
};

typedef struct LayerStack {
    BlendMode mode;
    GDALDataset* top;
    GDALDataset* bottom;
} LayerStack;


std::vector<LayerStack> parseArgs(int argc, const char** argv);
BlendMode parseBlendArg(const std::string arg);


std::vector<LayerStack> parseArgs(int argc, const char** argv) {

    std::vector<LayerStack> layers = {};

    for (int i = 1; i < argc; i++) {

        std::string arg = argv[i];
        if ( arg.find("--", 0) != std::string::npos ) {
            INFO("arg: {}\n", arg);
        } else if ( fs::exists(arg) ) {

            GDALDataset* top = (GDALDataset*) GDALOpen(argv[i], GA_ReadOnly);
            BlendMode mode = parseBlendArg(argv[++i]);
            GDALDataset* bottom = (GDALDataset*) GDALOpen(argv[++i], GA_ReadOnly);

            if (top == nullptr) {
                std::cerr << "ERR: Could not open file '" << argv[i - 2] << "'" << std::endl; 
                exit(ERR_FOPEN);
            }
            if (bottom == nullptr) {
                std::cerr << "ERR: Could not open file '" << argv[i] << "'" << std::endl; 
                exit(ERR_FOPEN);
            }

            layers.push_back( {mode, top, bottom} );
        }
    }

    return layers;
}

BlendMode parseBlendArg(const std::string arg) {
    if (arg == "ADD" || arg == "+") return ADD;
    else if (arg == "SUBSTRACT" || arg == "SUB" || arg == "-") return SUBSTRACT;
    else if (arg == "MULTIPLY" || arg == "MUL" || arg == "*") return MULTIPLY;
    else if (arg == "DIVIDE" || arg == "DIV" || arg == "/") return DIVIDE;
    else if (arg == "OVERLAY" || arg == "OVR" || arg == "|") return OVERLAY;
    else if (arg == "SCREEN" || arg == "SCR" || arg == "^") return SCREEN;
    else if (arg == "LIGHTEN" || arg == "LTN" || arg == ">") return LIGHTEN;
    else if (arg == "DARKEN" || arg == "DKN" || arg == "<") return DARKEN;
    exit(ERR_INVALID_BLEND);
}

void printBandsInfo(GDALDataset* layer) {
    
    for (uint8_t i = 1; auto&& band : layer->GetBands()) {
        auto colorInterp = band->GetColorInterpretation();
        vec2 blockSize;
        band->GetBlockSize(&blockSize.x, &blockSize.y);
        INFO("\tBand {}: {} ({}), block: {}x{}, type: {}\n",
             i,
             GDALGetColorInterpretationName(colorInterp),
             colorInterp,
             blockSize.x, blockSize.y,
             GDALGetDataTypeName(band->GetRasterDataType()));
        i++;
    }
}

int main(int argc, char const *argv[])
{
    for (int i = 0; i < argc; i++) {
        std::cout << argv[i] << std::endl;
    }
    
    GDALAllRegister();
    // auto lyr1 = (GDALDataset*) GDALOpen(argv[1], GA_ReadOnly);
    // auto lyr2 = (GDALDataset*) GDALOpen(argv[2], GA_ReadOnly);

    std::vector<LayerStack> stacks = parseArgs(argc, argv);
    for (auto&& stack : stacks) {
        INFO("Stack: {}({}, {}), proj: {}\n", BlendModeStr[stack.mode], *(stack.top->GetFileList()), *(stack.bottom->GetFileList()), stack.top->GetProjectionRef());

        vec2 sz1 = {stack.top->GetRasterXSize(), stack.top->GetRasterYSize()};
        INFO("Info: LYR ({},{})\n", sz1.x, sz1.y);
        printBandsInfo(stack.top);

        vec2 sz2 = { stack.bottom->GetRasterXSize(), stack.bottom->GetRasterYSize() };
        INFO("Info: LYR2 ({},{})\n", sz2.x, sz2.y);
        printBandsInfo(stack.bottom);

        if (sz1.x != sz2.x || sz1.y != sz2.y) {
            std::cerr << "Error: Rasters must be of the same size\n";
            return -1;
        }
    }

    return 0;
}
