import re

def process():
    with open('scratch-preview.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace switch to match what's in learncentric component (which uses type())
    content = content.replace('@switch (questionTypeCode()) {', '@switch (type()) {')

    # 2. Replace PrimeIcons
    # Check
    content = re.sub(r'<i class="pi pi-check text-white text-\[8px\] font-bold"><\/i>', 
                     '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-2.5 h-2.5 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>', content)
    # Chevron Down
    content = re.sub(r'<i class="pi pi-chevron-down text-\[[^\]]+\] text-gray-400"><\/i>',
                     '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-2.5 h-2.5 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>', content)
    # Image
    content = re.sub(r'<i class="pi pi-image text-gray-300 text-[^"]+"><\/i>',
                     '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-gray-300"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>', content)
    # Arrows Alt
    content = re.sub(r'<i class="pi pi-arrows-alt text-\[8px\] mr-1"><\/i>',
                     '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M10 9l-3 3 3 3"></path><path d="M22 12H14"></path><path d="M14 9l3 3-3 3"></path><path d="M2 12h8"></path></svg>', content)
    # Bars
    content = re.sub(r'<i class="pi pi-bars text-\[10px\] text-gray-400"><\/i>',
                     '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>', content)
    
    # Text toolbar
    content = content.replace('<i class="pi pi-bold text-[8px] text-gray-600"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>')
    content = content.replace('<i class="pi pi-italic text-[8px] text-gray-600"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>')
    content = content.replace('<i class="pi pi-underline text-[8px] text-gray-600"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>')
    content = content.replace('<i class="pi pi-align-left text-[8px] text-gray-600"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>')
    content = content.replace('<i class="pi pi-align-center text-[8px] text-gray-600"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>')
    
    # Pencil / Eraser
    content = content.replace('<i class="pi pi-pencil text-[9px] text-primary"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>')
    content = content.replace('<i class="pi pi-eraser text-[9px] text-gray-500"></i>', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>')
    
    # 3. Remove Shadows & Rings (AGENTS.md rule)
    content = re.sub(r'\bshadow-sm\b', '', content)
    content = re.sub(r'\bshadow-md\b', '', content)
    content = re.sub(r'\bshadow-inner\b', '', content)
    content = re.sub(r'\bring-1\b', '', content)
    content = re.sub(r'\bring-offset-1\b', '', content)
    content = re.sub(r'\bring-primary\b', '', content)
    
    # Cleanup extra spaces left by removal
    content = re.sub(r' +', ' ', content)
    content = content.replace(' class=""', '')
    
    # Write back
    with open('src/app/features/question-bank/components/question-type-preview/question-type-preview.html', 'w', encoding='utf-8') as f:
        f.write(content)

process()
