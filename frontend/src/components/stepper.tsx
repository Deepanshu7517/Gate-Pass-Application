import { cn } from '../lib/utils';
import { Check } from 'lucide-preact';

type Step = {
  name: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  className?: string;
};

// Define the custom colors for clarity and easy modification
const PRIMARY_COLOR = '#4051b5'; 
const CURRENT_STEP_BG = '#eef0f2'; // Your intended light background for current/pending steps

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      
      {/* NOTES: Mobile Stepper (SM and below)
        - Uses space-x-1 for critical fit of 9+ steps on phone screens. (UNCHANGED)
      */}
      <ol role="list" className="flex items-center space-x-1 md:hidden">
        {steps.map((step, index) => (
          <li key={step.name} className={cn('relative flex-1', { 'pr-0': index === steps.length - 1, 'pr-1': index < steps.length - 1 })}>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={cn('h-0.5 w-full', {
                        'bg-gray-200': index >= currentStep,
                    })} 
                    style={{backgroundColor: index < currentStep ? PRIMARY_COLOR : undefined}} />
                </div>
            )}

            {/* Step Status Icon/Number */}
            {index < currentStep ? (
              // COMPLETED STEP
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full"
                style={{backgroundColor: PRIMARY_COLOR}}
              >
                <Check className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
            ) : index === currentStep ? (
              // CURRENT STEP
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[--primary-color]"
                aria-current="step"
                style={{'--primary-color': PRIMARY_COLOR, backgroundColor: CURRENT_STEP_BG, color: PRIMARY_COLOR}}
              >
                <span className="font-semibold">{index + 1}</span> 
              </div>
            ) : (
              // PENDING STEP
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 text-gray-500"
                style={{backgroundColor: CURRENT_STEP_BG}}
              >
                 <span className="font-medium">{index + 1}</span>
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* NOTES: Desktop/Tablet Stepper (MD and up)
        - FIXED 1: Tighter spacing for tablets: md:space-x-4 lg:space-x-6.
        - FIXED 2: Step name ({step.name}) is hidden on tablets (md/lg) to ensure fit.
      */}
      <ol role="list" className="hidden md:flex md:space-x-4 lg:space-x-6 xl:space-x-8">
        {steps.map((step, index) => (
          <li key={step.name} className="flex-1 min-w-0"> 
            {index < currentStep ? (
              // COMPLETED STEP
              <div 
                className="group flex w-full flex-col border-t-4 py-2 pl-0 pt-4 transition-colors"
                style={{borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR}} 
              >
                 <span className="text-sm font-medium transition-colors flex items-center">
                   <span className="flex h-6 w-6 items-center justify-center rounded-full mr-2 text-white" style={{backgroundColor: PRIMARY_COLOR}}>
                    <Check className="h-4 w-4" />
                   </span>
                  {`Step ${index + 1}`}
                </span>
                {/* FIX: Hide step name on MD/LG, show only on LG+ (i.e., hide on the narrowest tablets) */}
                <span className="text-sm font-medium ml-8 hidden lg:block truncate">{step.name}</span>
              </div>
            ) : index === currentStep ? (
              // CURRENT STEP
              <div
                className="flex w-full flex-col border-t-4 py-2 pl-0 pt-4"
                aria-current="step"
                style={{borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR}}
              >
                <span className="text-sm font-medium flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 mr-2" style={{borderColor: PRIMARY_COLOR, backgroundColor: CURRENT_STEP_BG}}>
                        <span className="font-bold">{index + 1}</span> 
                    </span>
                    {`Step ${index + 1}`}
                </span>
                {/* FIX: Hide step name on MD/LG, show only on LG+ */}
                <span className="text-sm font-medium ml-8 hidden lg:block truncate">{step.name}</span>
              </div>
            ) : (
              // PENDING STEP
              <div className="group flex w-full flex-col border-t-4 border-gray-200 py-2 pl-0 pt-4 transition-colors hover:border-gray-300">
                <span className="text-sm font-medium text-gray-500 transition-colors flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 mr-2 group-hover:border-gray-400" style={{backgroundColor: CURRENT_STEP_BG}}>
                        <span className="text-gray-500 group-hover:text-gray-700">{index + 1}</span>
                    </span>
                    {`Step ${index + 1}`}
                </span>
                {/* FIX: Hide step name on MD/LG, show only on LG+ */}
                <span className="text-sm font-medium ml-8 hidden lg:block truncate">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}