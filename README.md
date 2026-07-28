<div
        className="relative z-30 flex flex-col
          min-h-[100svh]
          mobile-l:min-h-[600px]
          tablet:min-h-[700px]
          laptop:min-h-[750px]
          laptop-l:min-h-[820px]
          4k:min-h-[1100px]
          py-10
          mobile-l:py-12
          tablet:py-16
          laptop:py-0"
      >
        <div
          className="w-full max-w-7xl mx-auto
            px-4
            mobile-m:px-5
            mobile-l:px-6
            tablet:px-10
            laptop:px-16
            laptop-l:px-20
            4k:px-32"
        >
          <div
          className="flex justify-between"
            // className="grid grid-cols-1
            //   gap-6
            //   mobile-l:gap-8
            //   tablet:gap-10
            //   laptop:grid-cols-2 laptop:gap-12 laptop:items-center
            //   4k:gap-16"
          >
            {/* Left Side: Headline */}
            {/* <div> */}
              {/* <span
                className="inline-flex items-center rounded-full border border-[#0f4c8f]/40 bg-[#0f4c8f]/10 text-[#f59e0b] font-semibold uppercase
                  px-3 py-1.5 text-[10px] tracking-[0.15em] mb-3
                  mobile-l:px-4 mobile-l:py-2 mobile-l:text-xs mobile-l:tracking-[0.2em] mobile-l:mb-6"
              >
                🇩🇪 Study in Germany
              </span> */}

              <h1
                className="inline-block font-black pb-4 leading-tight text-white text-3xl mobile-m:text-4xl mobile-l:text-4xl tablet:text-5xl laptop:text-6xl laptop-l:text-7xl 4k:text-8xl"
              >
                STUDY IN

              </h1>
              <h1 
              className="inline-block font-black text-end leading-tight text-white text-3xl mobile-m:text-4xl mobile-l:text-4xl tablet:text-5xl laptop:text-6xl laptop-l:text-7xl 4k:text-8xl "
              >
                GERMANY
              </h1>
            </div>

            {/* Right Side: Paragraph & Actions */}
            {/* <div className="mt-4 laptop:mt-0">
              <p
                className="max-w-2xl leading-relaxed text-slate-300
                  text-sm
                  mobile-l:text-base
                  tablet:text-lg
                  laptop:text-xl"
              >
                From university shortlisting and APS certification to visa guidance,
                accommodation, and settling in Germany—we support you at every stage
                of your journey with transparent, personalized guidance.
              </p>

              <div
                className="flex flex-wrap gap-3 mt-6
                  mobile-l:gap-4
                  laptop:mt-10"
              >
                <button
                  onClick={onOpenConsultation}
                  className="w-full rounded-full bg-[#f59e0b] text-black font-semibold hover:scale-105 transition shadow-lg
                    px-6 py-3 text-sm
                    mobile-l:px-7 mobile-l:py-3.5
                    tablet:w-auto tablet:px-8 tablet:py-4 tablet:text-base"
                >
                  Book Free Consultation
                </button>

                <button
                  onClick={() => onNavigateToTab('services')}
                  className="w-full rounded-full border border-white/30 bg-white/15 text-white hover:bg-white/25 transition
                    px-6 py-3 text-sm
                    mobile-l:px-7 mobile-l:py-3.5
                    tablet:w-auto tablet:px-8 tablet:py-4 tablet:text-base"
                >
                  Explore Services
                </button>
              </div>
            </div> */}
          {/* </div> */}

          {/* Stats Grid */}
          {/* <div
            className="grid gap-3 mt-8
              grid-cols-2
              mobile-l:gap-4
              tablet:mt-12 tablet:grid-cols-4
              laptop:mt-16
              4k:gap-6 4k:mt-24"
          >
            {[
              { value: "400K+", label: "International Students" },
              { value: "€0", label: "Public University Tuition" },
              { value: "98%", label: "Visa Success Guidance" },
              { value: "24/7", label: "Student Support" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md
                  p-3
                  mobile-l:p-4
                  4k:p-6"
              >
                <div
                  className="font-bold text-[#0f4c8f]
                    text-lg
                    mobile-l:text-xl
                    tablet:text-2xl
                    4k:text-3xl"
                >
                  {item.value}
                </div>

                <div
                  className="uppercase tracking-wider text-slate-300 mt-1
                    text-[9px]
                    mobile-l:text-[10px]
                    tablet:text-xs
                    4k:text-sm"
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>