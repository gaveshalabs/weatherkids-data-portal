export function throwIfAlreadyLoaded(parentModule, moduleName: string) {
    if (parentModule) {
        throw new Error(
            `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
        );
    }
}
