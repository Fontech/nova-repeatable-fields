<template>
    <div>
        <select
            :id="subField.name"
            :name="subField.name"
            class="w-full form-control form-select"
            :value="value"
            v-bind="subField.attributes"
            @change="$emit('input', $event.target.value)">
            <option
                value=""
                v-text="subField.placeholder"
                selected
                disabled
            ></option>
            <option
                v-for="(option, name) in options"
                :value="name"
                :selected="name == value"
                v-text="option.label"
                :disabled="option.disabled"
            ></option>
        </select>
    </div>

</template>

<script>

    export default {

        props: [
            'subField',
            'options',
            'value'
        ],

    }
</script>
