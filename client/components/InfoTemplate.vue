<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-8 max-sm:px-4 max-md:pt-6">
      <div class="relative mb-9 flex justify-between items-center">
        <div class="nav-pill absolute h-[150px] w-full top-[50%] -z-10 max-2xl:hidden"></div>
        <div>
          <h1 class="text-3xl font-medium mb-[10px] max-sm:text-xl">Terms of Servise</h1>
          <p class="opacity-60 max-sm:text-xs">Private content version: 10th of September, 2025</p>
        </div>

        <div class="max-md:hidden"> 
          <HeaderActions/>
        </div>
      </div>

      <div class="bg-[var(--color-bg-secondary)] rounded-3xl p-8 border border-[#3A2B41] max-sm:p-4">
        <div class="prose prose-invert max-w-none">
          <div v-for="(section, index) in pageData.content" :key="index" class="mb-6">
            <h2 v-if="section.type === 'title'" class="text-2xl font-medium text-white mb-4 max-sm:text-xl">{{ section.text }}</h2>
            <p v-else-if="section.type === 'paragraph'" class="text-white/80 sm:leading-relaxed mb-4 sm:text-justify max-sm:text-sm">{{ section.text }}</p>
            <ul v-else-if="section.type === 'list'" class="list-disc list-inside text-white/80 space-y-2 mb-4">
              <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="space-y-2">{{ item }}</li>
            </ul>
            <div v-else-if="section.type === 'subsection'" class="mb-6">
              <h3 class="text-xl font-semibold text-white mb-3">{{ section.title }}</h3>
              <p class="text-white/80 leading-relaxed sm:text-justify">{{ section.text }}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeaderActions from './HeaderActions.vue'

const props = defineProps({
  type: { type: String, required: false }
})

const route = useRoute()
const hideInPageHeader = computed(() => !!route.meta?.hideHeaderNav)

const pageDataMap = {
  'terms-of-service': {
    title: 'Terms of Service',
    subtitle: 'Private content version: 10th of September, 2025',
    content: [
      { type: 'paragraph', text: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.' },
      { type: 'paragraph', text: 'No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' },
      { type: 'title', text: '1. Acceptance of Terms' },
      { type: 'paragraph', text: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website\'s particular services, you shall be subject to any posted guidelines or rules applicable to such services.' },
      { type: 'title', text: '2. Use License' },
      { type: 'paragraph', text: 'Permission is granted to temporarily download one copy of the materials (information or software) on GODDASS.AI\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:' },
      { type: 'list', items: ['modify or copy the materials','use the materials for any commercial purpose or for any public display (commercial or non-commercial)','attempt to decompile or reverse engineer any software contained on GODDASS.AI\'s website','remove any copyright or other proprietary notations from the materials'] },
      { type: 'title', text: '3. Disclaimer' },
      { type: 'paragraph', text: 'The materials on GODDASS.AI\'s website are provided on an \'as is\' basis. GODDASS.AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.' }
    ]
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    subtitle: 'Last updated: 10th of September, 2025',
    content: [
      { type: 'paragraph', text: 'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from GODDASS.AI (the "Site").' },
      { type: 'title', text: 'Personal Information We Collect' },
      { type: 'paragraph', text: 'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.' },
      { type: 'title', text: 'How Do We Use Your Personal Information' },
      { type: 'paragraph', text: 'We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).' },
      { type: 'list', items: ['Communicate with you','Screen our orders for potential risk or fraud','Provide you with information or advertising relating to our products or services'] }
    ]
  },
  'cancellation-policy': {
    title: 'Cancellation Policy',
    subtitle: 'Effective: 10th of September, 2025',
    content: [
      { type: 'paragraph', text: 'We understand that circumstances may change and you may need to cancel your subscription. This policy outlines our cancellation terms and procedures.' },
      { type: 'title', text: 'Subscription Cancellation' },
      { type: 'paragraph', text: 'You may cancel your subscription at any time through your account settings or by contacting our support team. Cancellations will take effect at the end of your current billing period.' },
      { type: 'title', text: 'Refund Policy' },
      { type: 'paragraph', text: 'Refunds are provided on a case-by-case basis. If you cancel within 30 days of your initial subscription, you may be eligible for a full refund.' }
    ]
  },
  'complaint-policy': {
    title: 'Complaint Policy',
    subtitle: 'How to submit a complaint and what to expect',
    content: [
      { type: 'paragraph', text: 'We take all complaints seriously. If you believe content or behavior on our platform violates our policies, please submit a complaint using the contact methods listed below.' },
      { type: 'title', text: 'How to File a Complaint' },
      { type: 'list', items: ['Provide a clear description of the issue','Include any relevant URLs or screenshots','Share contact details so we can follow up'] },
      { type: 'title', text: 'Response Timeline' },
      { type: 'paragraph', text: 'We aim to acknowledge complaints within 48 hours and provide an initial response within 7 business days.' }
    ]
  },
  'content-removal-policy': {
    title: 'Content Removal Policy',
    subtitle: 'Guidelines for requesting content takedowns',
    content: [
      { type: 'paragraph', text: 'If you believe certain content infringes your rights or violates our policies, you may request its removal.' },
      { type: 'title', text: 'Eligibility for Removal' },
      { type: 'list', items: ['Copyright infringement','Privacy violations or personal data exposure','Content that violates applicable laws'] },
      { type: 'title', text: 'How to Request Removal' },
      { type: 'paragraph', text: 'Send a detailed request including the exact URL(s), a description of the issue, and proof of ownership where applicable.' }
    ]
  }
}

const pageData = computed(() => {
  return pageDataMap[props.type] || {
    title: 'Page Not Found',
    subtitle: 'The requested page could not be found',
    content: [
      { type: 'paragraph', text: 'The page you are looking for does not exist. Please check the URL and try again.' }
    ]
  }
})

useHead(() => ({
  title: `${pageData.value.title} - GODDASS.AI`,
  meta: [
    { name: 'description', content: pageData.value.subtitle }
  ]
}))
</script>

<style scoped>


.nav-pill > * {
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.nav-pill::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background: 
    linear-gradient(180deg, #E02C7D 0%, #5B54C4 90%) no-repeat;   
  transition: opacity 200ms ease-in-out;
  filter: blur(100px);
}

</style>
