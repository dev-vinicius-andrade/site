import { SwaggerOverrideDefaultParameterOptions } from '@/types/component/swagger';
import { Nullable } from '@/types/nullable';

export function useSwaggerOverrideDefaultParameter() {
	const swaggerDefaultParameterOptions = ref<Nullable<SwaggerOverrideDefaultParameterOptions[]>>(null);
	function parameterWithSameNameExists(name: string) {
		if (!swaggerDefaultParameterOptions.value) return false;
		const exists = swaggerDefaultParameterOptions.value.some(option => option.name === name);
		return exists;
	}
	function updateParameter(options: SwaggerOverrideDefaultParameterOptions) {
		if (!swaggerDefaultParameterOptions.value) return;
		const index = swaggerDefaultParameterOptions.value.findIndex(option => option.name === options.name);
		if (index === -1) return;
		swaggerDefaultParameterOptions.value[index] = options;
	}
	function addParameter(options: SwaggerOverrideDefaultParameterOptions) {
		if (!swaggerDefaultParameterOptions.value) {
			swaggerDefaultParameterOptions.value = [];
		}
		swaggerDefaultParameterOptions.value.push(options);
	}
	function removeParameter(name: string) {
		if (!swaggerDefaultParameterOptions.value) return;
		const index = swaggerDefaultParameterOptions.value.findIndex(option => option.name === name);
		if (index === -1) return;
		swaggerDefaultParameterOptions.value.splice(index, 1);
	}
	function setParameterOption(...options: SwaggerOverrideDefaultParameterOptions[]) {
		if (options.length === 0) return;
		for (const option of options) {
			if (parameterWithSameNameExists(option.name)) {
				updateParameter(option);
			} else {
				addParameter(option);
			}
		}
	}
	return {
		swaggerDefaultParameterOptions,
		parameterWithSameNameExists,
		updateParameter,
		addParameter,
		setParameterOption,
		removeParameter,
	};
}
