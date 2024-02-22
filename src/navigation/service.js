import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions, CommonActions } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const navigate = (name, params, key) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate({ name, params, ...(!!key && { key: `${name} ${key}` }) }));
    }
};

const replace = (name, params) => {
    if (navigationRef.isReady) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
};

const pushNavigate = (name, params, key) => {
    if (navigationRef.isReady) {
        navigationRef.dispatch(StackActions.push(name, params));
    }
};

const pop = (numberPop = 1) => {
    if (navigationRef.isReady) {
        navigationRef.dispatch(StackActions.pop(numberPop));
    }
};

const goBack = () => {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
};

const resetToHome = () => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(tree => {
            //console.log('Old tree', tree);
            var newTree = {
                ...tree,
                routes: tree.routes?.map((tab, index) => {
                    if (index !== 1) return tab;
                    return {
                        ...tab,
                        ...(!!tab.state && { state: { ...tab.state, routes: [tab.state.routes[0]], index: 0 } }),
                    };
                }),
            };

            //console.log('New tree', newTree);
            return CommonActions.reset({ ...newTree });
        });
    }
};

export { navigationRef, navigate, goBack, replace, pushNavigate, pop, resetToHome };
