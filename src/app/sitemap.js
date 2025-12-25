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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var firestore_1 = require("firebase/firestore");
var firebaseApi_1 = require("@/server/firebaseApi");
function sitemap() {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, windowsToolsUrls, toolsRef, snapshot, error_1, staticPages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = 'https://kalifaos.site';
                    windowsToolsUrls = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    toolsRef = (0, firestore_1.collection)(firebaseApi_1.db, 'Windows-tools');
                    return [4 /*yield*/, (0, firestore_1.getDocs)(toolsRef)];
                case 2:
                    snapshot = _a.sent();
                    windowsToolsUrls = snapshot.docs.map(function (doc) { return ({
                        url: "".concat(baseUrl, "/windows-tools/").concat(doc.id),
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.9,
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error generating sitemap for windows tools:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    staticPages = [
                        {
                            url: baseUrl,
                            lastModified: new Date(),
                            changeFrequency: 'daily',
                            priority: 1,
                        },
                        {
                            url: "".concat(baseUrl, "/about"),
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.8,
                        },
                        {
                            url: "".concat(baseUrl, "/contact"),
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.8,
                        },
                        {
                            url: "".concat(baseUrl, "/docs"),
                            lastModified: new Date(),
                            changeFrequency: 'weekly',
                            priority: 0.8,
                        },
                        {
                            url: "".concat(baseUrl, "/frp-tools-apk-download"),
                            lastModified: new Date(),
                            changeFrequency: 'weekly',
                            priority: 0.9,
                        },
                        {
                            url: "".concat(baseUrl, "/pricing"),
                            lastModified: new Date(),
                            changeFrequency: 'yearly',
                            priority: 0.6,
                        },
                        {
                            url: "".concat(baseUrl, "/privacy"),
                            lastModified: new Date(),
                            changeFrequency: 'yearly',
                            priority: 0.5,
                        },
                        {
                            url: "".concat(baseUrl, "/setting-and-lock-screen"),
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.7,
                        },
                        {
                            url: "".concat(baseUrl, "/system-apps"),
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.7,
                        },
                        {
                            url: "".concat(baseUrl, "/terms"),
                            lastModified: new Date(),
                            changeFrequency: 'yearly',
                            priority: 0.5,
                        },
                        {
                            url: "".concat(baseUrl, "/tools-access"),
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.6,
                        },
                        {
                            url: "".concat(baseUrl, "/windows-tools"),
                            lastModified: new Date(),
                            changeFrequency: 'daily',
                            priority: 0.9,
                        },
                    ];
                    // ============================================
                    // 3. COMBINE EVERYTHING
                    // ============================================
                    return [2 /*return*/, __spreadArray(__spreadArray([], staticPages, true), windowsToolsUrls, true)];
            }
        });
    });
}
exports.default = sitemap;
