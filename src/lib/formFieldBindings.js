export default ($field) => {
    return {
        extra: $field.error,
        className: $field.error && 'has-error',
        label: $field.label
    }
}
