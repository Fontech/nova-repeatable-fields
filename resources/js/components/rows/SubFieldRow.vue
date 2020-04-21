<template>
    <div class="row mb-1 relative" :class="formLayout">
        <button
            class="row-delete inline-flex items-center justify-center appearance-none cursor-pointer text-70 hover:text-primary h-full pb-2 absolute"
            type="button"
            @click="deleteRow">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current">
                <path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path>
            </svg>
        </button>
        <div class="row-inputs flex -mr-4" :class="formLayout">
            <h3 v-if="field.heading && field.display_stacked" class="mb-2">
                {{ field.heading + " #" + (index + 1) }}
            </h3>
            <component
                v-for="(subField, index) in field.sub_fields"
                :is="`${subField.type}-sub-field`"
                :key="index"
                :sub-field="subField"
                :options="options(subField)"
                v-model="value[subField.name]"
                class="row-input mr-4"
                :min-date="minDate(subField)"
                :class="getInputLayout(subField)"
            ></component>
        </div>
    </div>
</template>

<script>
    import { pluck, contains } from '../../libs/helpers'
    import TextSubField from '../sub-fields/TextSubField.vue';
    import TimeSubField from '../sub-fields/TimeSubField.vue';
    import EmailSubField from '../sub-fields/EmailSubField.vue';
    import NumberSubField from '../sub-fields/NumberSubField.vue';
    import SelectSubField from '../sub-fields/SelectSubField.vue';
    import TextareaSubField from '../sub-fields/TextareaSubField.vue';

    export default {

        components: {
            TextSubField,
            TimeSubField,
            EmailSubField,
            NumberSubField,
            SelectSubField,
            TextareaSubField,
        },

        props: ['value', 'field', 'index', 'rows'],

        computed:{
            formLayout(){
                return (this.field.display_stacked)
                    ? '-vertical'
                    : '-horizontal';
            }
        },

        methods:{
            minDate(subField) {
                const afterFieldName = subField.after

                return this.value[afterFieldName]
            },
            uniqueFieldName(subField) {
                return subField.name
            },
            options(subField) {
                if (subField.unique) {
                    return this.uniqueOptions(subField)
                }

                return subField.options
            },
            pluckedValues(subField) {
                const keyName = this.uniqueFieldName(subField)

                return pluck(this.rows, keyName)
            },
            uniqueOptions(subField) {
                const values = this.pluckedValues(subField)

                const uniqueOptions = subField.options.map((option, index) => {
                    const isOptionExisted = values.includes(`${index}`)

                    option.disabled = isOptionExisted

                    return option
                })

                return uniqueOptions
            },
            deleteRow(){
                this.$emit('delete-row', this.index);
            },
            getInputLayout(subField){
                let width = (subField.width)
                    ? subField.width
                    : 'flex-1';

                if(this.field.display_stacked){
                	return this.formLayout;
                }
                return `${this.formLayout} ${width} mb-2`
            },
        }

    }
</script>
