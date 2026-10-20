import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

def setup_driver(width, height):
    chrome_options = Options()
    chrome_options.add_argument('--headless=new')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument(f'--window-size={width},{height}')
    chrome_options.binary_location = '/usr/bin/google-chrome'
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(width, height)
    return driver

def capture_suite(width, height, label):
    os.makedirs(f'/tmp/qa_shots/{label}', exist_ok=True)
    driver = setup_driver(width, height)
    
    try:
        url = 'http://localhost:3001/'
        driver.get(url)
        print(f"[{label}] Loaded {url}. Waiting for preloader to finish...")
        
        # Wait for preloader to finish (2-3 seconds)
        time.sleep(3.5)
        
        # Get total scroll height
        total_h = driver.execute_script("return document.documentElement.scrollHeight - window.innerHeight;")
        vh = height
        print(f"[{label}] Total scrollable height: {total_h}px")
        
        # Section heights defined:
        # hero: 230vh (2.3vh)
        # about: 280vh (2.8vh)
        # work: 460vh (4.6vh)
        # journey: 240vh (2.4vh)
        # skills: 280vh (2.8vh)
        # awards: 320vh (3.2vh)
        # contact: 240vh (2.4vh)
        
        sections = [
            ("hero", 0.0, 2.3),
            ("about", 2.3, 2.8),
            ("work", 5.1, 4.6),
            ("journey", 9.7, 2.4),
            ("skills", 12.1, 2.8),
            ("awards", 14.9, 3.2),
            ("contact", 18.1, 2.4)
        ]
        
        # Capture beginning, middle, end of each section
        for s_name, start_vh, h_vh in sections:
            start_y = start_vh * vh
            mid_y = (start_vh + h_vh * 0.5) * vh
            end_y = (start_vh + h_vh * 0.95) * vh
            
            for stage, y_pos in [("start", start_y), ("mid", mid_y), ("end", end_y)]:
                driver.execute_script(f"window.scrollTo(0, {y_pos});")
                time.sleep(0.4)
                shot_path = f"/tmp/qa_shots/{label}/{s_name}_{stage}.png"
                driver.save_screenshot(shot_path)
                print(f"[{label}] Saved {shot_path} (y={int(y_pos)})")
                
            # Middle of blade transition (at boundaries between sections)
            trans_y = start_y + 0.1 * vh
            driver.execute_script(f"window.scrollTo(0, {trans_y});")
            time.sleep(0.4)
            shot_path = f"/tmp/qa_shots/{label}/{s_name}_blade_trans.png"
            driver.save_screenshot(shot_path)
            
    finally:
        driver.quit()

print("Capturing 1600x900 desktop screenshots...")
capture_suite(1600, 900, "desktop_1600x900")

print("Capturing 390x844 mobile screenshots...")
capture_suite(390, 844, "mobile_390x844")

print("All screenshots captured!")

