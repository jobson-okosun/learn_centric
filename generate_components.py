import os

components = [
    ('short-text', 'ShortText'),
    ('essay-plain-text', 'EssayPlainText'),
    ('essay-rich-text', 'EssayRichText'),
    ('cloze-text', 'ClozeText'),
    ('cloze-dropdown', 'ClozeDropdown'),
    ('cloze-radio', 'ClozeRadio'),
    ('cloze-text-image', 'ClozeTextImage'),
    ('cloze-dropdown-image', 'ClozeDropdownImage'),
    ('image-drag-and-drop', 'ImageDragAndDrop'),
    ('drawing-and-writing', 'DrawingAndWriting'),
    ('order-list', 'OrderList'),
    ('association', 'Association')
]

base_dir = r"C:\Users\DELL\Desktop\MULTILENT\JOB-OKOSUN-MULTILENT\APPS\learncentric\src\app\features\question-bank\components"

for folder, class_name in components:
    dir_path = os.path.join(base_dir, folder)
    os.makedirs(dir_path, exist_ok=True)
    
    # TS File
    ts_content = f"""import {{ Component }} from '@angular/core';

@Component({{
  selector: 'app-{folder}',
  standalone: true,
  templateUrl: './{folder}.html',
}})
export class {class_name} {{
}}
"""
    with open(os.path.join(dir_path, f"{folder}.ts"), "w") as f:
        f.write(ts_content)
        
    # HTML File
    html_content = f"""<div class="p-6">
    <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
        <h3 class="text-lg font-bold text-gray-900 mb-2">{class_name} Component Pending</h3>
        <p class="text-sm">This component is scheduled for a future batch.</p>
    </div>
</div>
"""
    with open(os.path.join(dir_path, f"{folder}.html"), "w") as f:
        f.write(html_content)

print("Generated all missing components.")
