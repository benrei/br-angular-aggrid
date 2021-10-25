import { ActivatedRoute } from '@angular/router';
import ObjectUtils from './object.utils';

export default class RouteUtils {
  static getEntityId(route: ActivatedRoute): string | null {
    // Check if ag-grid is inside a child route.
    const { snapshot } = route;
    const fcIsEmpty = ObjectUtils.isEmpty(snapshot.firstChild?.params || {});
    const params = fcIsEmpty ? snapshot.params : snapshot.firstChild?.params;
    if (Object.keys(params).length > 0) {
      const keyValue = Object.entries(params)[0];
      return keyValue ? keyValue[1] : null;
    }
    return null;
  }
}
