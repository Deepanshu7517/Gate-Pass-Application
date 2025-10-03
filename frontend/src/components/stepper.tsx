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

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      {/* Mobile Stepper */}
      <ol role="list" className="flex items-center md:hidden">
        {steps.map((step, index) => (
          <li key={step.name} className={cn('relative flex-1 ', { 'pr-8 sm:pr-20': index !== steps.length -1 })}>
            {index < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary bg-[#4051b5] " />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary  bg-[#4051b5]"
                >
                  <Check className="h-5 w-5 text-primary-foreground text-white bg-[#4051b5]" aria-hidden="true" />
                </div>
              </>
            ) : index === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-white border-[#4051b5]"
                  aria-current="step"
                >
                  <span className="rounded-full bg-background h-full w-full bg-[#eef0f2]" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background"
                >
                   <span className=" rounded-full h-full w-full bg-[#eef0f2]" />
                </div>
              </>
            )}
          </li>
        ))}
      </ol>

      {/* Desktop Stepper */}
      <ol role="list" className="hidden md:flex md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.name} className="flex-1">
            {index < currentStep ? (
              <div className="group flex w-full flex-col border-t-4 border-primary py-2 pl-0 pt-4 transition-colors text-[#4051b5]">
                 <span className="text-sm font-medium text-primary transition-colors flex items-center">
                   <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary mr-2">
                    <Check className="h-4 w-4 text-primary-foreground" />
                   </span>
                  {`Step ${index + 1}`}
                </span>
                <span className="text-sm font-medium ml-8">{step.name}</span>
              </div>
            ) : index === currentStep ? (
              <div
                className="flex w-full flex-col border-t-4 border-primary py-2 pl-0 pt-4 "
                aria-current="step"
              >
                <span className="text-sm font-medium text-primary flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary mr-2">
                        <span className="text-primary">{index + 1}</span>
                    </span>
                    {`Step ${index + 1}`}
                </span>
                <span className="text-sm font-medium ml-8">{step.name}</span>
              </div>
            ) : (
              <div className="group flex w-full flex-col border-t-4 border-gray-200 py-2 pl-0 pt-4 transition-colors">
                <span className="text-sm font-medium text-gray-500 transition-colors flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 mr-2">
                        <span className="text-gray-500">{index + 1}</span>
                    </span>
                    {`Step ${index + 1}`}
                </span>
                <span className="text-sm font-medium ml-8">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
