import { ref, computed } from 'vue'

export const useApiData = () => {
  const data = ref({})
  const loading = ref(true)
  const error = ref(null)
  const currentType = ref('girlfriend') // Default type

  const fetchData = async (type = 'girlfriend') => {
    try {
      console.log('Fetching data for type:', type)
      loading.value = true
      error.value = null
      currentType.value = type
      
      // Always try to fetch, let the browser handle CORS if needed
      console.log('Making API request to: http://localhost:3001/api/data')
      const response = await fetch('http://localhost:3001/api/data')
      
      console.log('Response status:', response.status)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('Data received:', result)
      data.value = result
    } catch (err) {
      console.error('Error fetching data:', err)
      error.value = err.message
    } finally {
      loading.value = false
      console.log('Loading finished')
    }
  }

  // Computed properties for easy access to specific data sections
  const navigation = computed(() => data.value.navigation || {})
  const sidebar = computed(() => data.value.sidebar || {})
  
  // Get data based on current type
  const getDataSet = computed(() => {
    const dataSets = data.value.dataSets || {}
    console.log('Current type:', currentType.value)
    console.log('Available dataSets:', Object.keys(dataSets))
    const result = dataSets[currentType.value] || dataSets.girlfriend || {}
    console.log('Selected dataset:', result)
    return result
  })
  
  const featuredModels = computed(() => {
    const models = getDataSet.value.featuredModels || []
    return models.map(model => ({ ...model, image: '/images/girl.png' }))
  })
  const aiModels = computed(() => {
    const models = getDataSet.value.aiModels || []
    return models.map(model => ({ ...model, image: '/images/girl.png' }))
  })
  const faq = computed(() => data.value.faq || {})
  const footer = computed(() => data.value.footer || {})

  // Method to change data type
  const setDataType = async (type) => {
    console.log('Setting data type to:', type)
    currentType.value = type
    // Re-fetch data when type changes
    await fetchData(type)
  }

  return {
    data,
    loading,
    error,
    currentType,
    fetchData,
    setDataType,
    navigation,
    sidebar,
    featuredModels,
    aiModels,
    faq,
    footer
  }
}
