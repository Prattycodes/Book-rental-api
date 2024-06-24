"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.db.query.usersTable.findMany({
        columns: { password: false },
    });
    res.json(users);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, email } = req.body;
    const password = bcrypt_1.default.hashSync(req.body.password, 10);
    const user = yield db_1.db
        .insert(schemas_1.usersTable)
        .values({ name, age, email, password });
    res.json(user);
}));
exports.default = router;