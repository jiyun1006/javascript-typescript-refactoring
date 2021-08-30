import { RouteInfo } from '../types';
import View from './view';


export default class Router {
    routeTable: RouteInfo[];
    defaultRoute: RouteInfo | null;
    constructor() {

        this.routeTable = [];
        this.defaultRoute = null;
        window.addEventListener('hashchange', this.route.bind(this));

    }
    setDefaultPage(page: View): void {
        this.defaultRoute = { path: '', page };
    }

    addRoutePath(path: string, page: View): void {
        this.routeTable.push({ path, page });
    }
    route() {
        const routePath = location.hash;

        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render();
        }

        for (const routeInfo of this.routeTable) { // for문과 달리 더 깔끔하다.
            if (routePath.indexOf(routeInfo.path) >= 0) { // routePath안에 routeInfo.path가 들어있는지 확인.
                routeInfo.page.render();
                break;
            }
        }
    }

}
