import YAML from 'yaml';
import BaseValidator from "./base-validator";
import ShopYaml from "../../shop/docs/shop.yaml";
import DataType from "../docs/data-type.yaml";

// Usage of this class requires yaml to be parsed raw
// bundle:
//   rawFileExtensions:
//     - yaml
export class Validator {
  static validateShopId(shopId) {
    const { ShopIdAWS } = YAML.parse(ShopYaml);
    new BaseValidator(ShopIdAWS).validate(shopId);
  }

  static validateDateString(dateString) {
    const { DateString } = YAML.parse(DataType);
    new BaseValidator(DateString).validate(dateString);
  }

  static validateIsoString(isoString) {
    const { IsoFullString } = YAML.parse(DataType);
    new BaseValidator(IsoFullString).validate(isoString);
  }

  static validateBase64String(base64) {
    const { Base64String } = YAML.parse(DataType);
    new BaseValidator(Base64String).validate(base64);
  }
}