"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCloudinaryDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cloudinary_dto_1 = require("./create-cloudinary.dto");
class UpdateCloudinaryDto extends (0, mapped_types_1.PartialType)(create_cloudinary_dto_1.CreateCloudinaryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCloudinaryDto = UpdateCloudinaryDto;
//# sourceMappingURL=update-cloudinary.dto.js.map