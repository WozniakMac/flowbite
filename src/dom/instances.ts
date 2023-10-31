import { AccordionInterface } from '../components/accordion/interface';
import { CarouselInterface } from '../components/carousel/interface';
import { CollapseInterface } from '../components/collapse/interface';
import { DialInterface } from '../components/dial/interface';
import { DismissInterface } from '../components/dismiss/interface';
import { DrawerInterface } from '../components/drawer/interface';
import { DropdownInterface } from '../components/dropdown/interface';
import { ModalInterface } from '../components/modal/interface';
import { PopoverInterface } from '../components/popover/interface';
import { TabsInterface } from '../components/tabs/interface';
import { TooltipInterface } from '../components/tooltip/interface';

class Instances {
    private _instances: {
        Accordion: { [id: string]: AccordionInterface };
        Carousel: { [id: string]: CarouselInterface };
        Collapse: { [id: string]: CollapseInterface };
        Dial: { [id: string]: DialInterface };
        Dismiss: { [id: string]: DismissInterface };
        Drawer: { [id: string]: DrawerInterface };
        Dropdown: { [id: string]: DropdownInterface };
        Modal: { [id: string]: ModalInterface };
        Popover: { [id: string]: PopoverInterface };
        Tabs: { [id: string]: TabsInterface };
        Tooltip: { [id: string]: TooltipInterface };
    };

    constructor() {
        this._instances = {
            Accordion: {},
            Carousel: {},
            Collapse: {},
            Dial: {},
            Dismiss: {},
            Drawer: {},
            Dropdown: {},
            Modal: {},
            Popover: {},
            Tabs: {},
            Tooltip: {},
        };
    }

    addInstance(
        component: keyof Instances['_instances'],
        instance: any,
        id?: string,
        forceOverride = false
    ) {
        if (!this._instances[component]) {
            console.warn(`Flowbite: Component ${component} does not exist.`);
            return false;
        }

        if (this._instances[component][id] && !forceOverride) {
            console.warn(`Flowbite: Instance with ID ${id} already exists.`);
            return;
        }

        this._instances[component][id ? id : this._generateRandomId()] =
            instance;
    }

    getAllInstances() {
        return this._instances;
    }

    getInstances(component: keyof Instances['_instances']) {
        if (!this._instances[component]) {
            console.warn(`Flowbite: Component ${component} does not exist.`);
            return false;
        }
        return this._instances[component];
    }

    getInstance(component: keyof Instances['_instances'], id: string) {
        if (!this._componentAndInstanceCheck(component, id)) {
            return;
        }

        if (!this._instances[component][id]) {
            console.warn(`Flowbite: Instance with ID ${id} does not exist.`);
            return;
        }
        return this._instances[component][id] as any;
    }

    destroyAndRemoveInstance(
        component: keyof Instances['_instances'],
        id: string
    ) {
        this.destroyInstanceObject(component, id);
        this.removeInstance(component, id);
    }

    removeInstance(component: keyof Instances['_instances'], id: string) {
        if (!this._componentAndInstanceCheck(component, id)) {
            return;
        }
        this._instances[component][id].removeInstance();
    }

    reset() {
        this._instances = {
            Accordion: {},
            Carousel: {},
            Collapse: {},
            Dial: {},
            Dismiss: {},
            Drawer: {},
            Dropdown: {},
            Modal: {},
            Popover: {},
            Tabs: {},
            Tooltip: {},
        };
    }

    destroyInstanceObject(
        component: keyof Instances['_instances'],
        id: string
    ) {
        if (!this._componentAndInstanceCheck(component, id)) {
            return;
        }
        this._instances[component][id].destroy();
    }

    instanceExists(component: keyof Instances['_instances'], id: string) {
        if (!this._instances[component]) {
            return false;
        }

        if (!this._instances[component][id]) {
            return false;
        }

        return true;
    }

    private _generateRandomId() {
        return Math.random().toString(36).substr(2, 9);
    }

    private _componentAndInstanceCheck(
        component: keyof Instances['_instances'],
        id: string
    ) {
        if (!this._instances[component]) {
            console.warn(`Flowbite: Component ${component} does not exist.`);
            return false;
        }

        if (!this._instances[component][id]) {
            console.warn(`Flowbite: Instance with ID ${id} already exists.`);
            return false;
        }

        return true;
    }
}

const instances = new Instances();

export default instances;

if (typeof window !== 'undefined') {
    window.FlowbiteInstances = instances;
}
