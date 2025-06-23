"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_entity_1 = require("../database/entities/activity.entity");
const fastCsv = __importStar(require("fast-csv"));
let ExportService = class ExportService {
    constructor(activityRepo) {
        this.activityRepo = activityRepo;
    }
    async streamActivitiesCsv(res) {
        try {
            const parents = await this.activityRepo.find({
                where: { parentActivity: (0, typeorm_2.IsNull)() },
                relations: ['subActivities'],
                order: { id: 'ASC' },
            });
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="activities.csv"');
            const csvStream = fastCsv.format({ headers: true });
            csvStream.pipe(res);
            for (const parent of parents) {
                // Parent row
                csvStream.write({
                    ID: parent.id,
                    Title: parent.title,
                    Status: parent.status,
                    Responsibility: parent.responsibility || '',
                    'Parent Activity ID': '',
                    'Current Status': parent.currentStatus || '',
                });
                // Child rows
                parent.subActivities
                    .sort((a, b) => a.id - b.id) // ensure sub-activities ordered
                    .forEach(sub => {
                    csvStream.write({
                        ID: sub.id,
                        Title: `  ${sub.title}`, // Indent for readability
                        Status: sub.status,
                        Responsibility: sub.responsibility || '',
                        'Parent Activity ID': parent.id,
                        'Current Status': sub.currentStatus || '',
                    });
                });
            }
            csvStream.end();
        }
        catch (err) {
            console.error('CSV stream failed:', err);
            throw new common_1.InternalServerErrorException('Failed to generate CSV');
        }
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExportService);
