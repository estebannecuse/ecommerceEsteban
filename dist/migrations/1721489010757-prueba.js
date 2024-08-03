"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prueba1721489010757 = void 0;
class Prueba1721489010757 {
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE 'prueba'");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE 'prueba'");
    }
}
exports.Prueba1721489010757 = Prueba1721489010757;
//# sourceMappingURL=1721489010757-prueba.js.map