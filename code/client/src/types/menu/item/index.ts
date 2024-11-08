import { RouteLocationRaw } from 'vue-router';
import { Position } from '@enums/position';
import { Roles } from '@/enums/auth/roles';
export declare type Menu = {
	title: string;
	to?: RouteLocationRaw;
	position?: Position;
	prependIcon?: string;
	appendIcon?: string;
	authorizedRoles?: Roles[];
};
export default Menu;
